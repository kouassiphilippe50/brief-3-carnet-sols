import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  ajouterObservation,
  creerObservation,
  formaterObservation,
  listerObservations,
  trouverParId,
  verifierObservation,
} from '../src/registre.js';

// Copie figée des données de départ : vos ajouts dans donnees/observations.json ne changent pas les tests.
const DONNEES = JSON.parse(readFileSync(new URL('./donnees-test.json', import.meta.url), 'utf8'));

// Une copie neuve des données pour chaque test : un ajout ne gêne pas les autres tests.
function copieDesDonnees() {
  return DONNEES.map((observation) => ({ ...observation }));
}

const SAISIE_VALIDE = { id: 'S11', parcelle: 'P6', texture: 'limoneux', pH: '6.4', etatHumidite: 'humide' };

test('formaterObservation écrit une observation sur une ligne', () => {
  assert.equal(formaterObservation(DONNEES[0]), 'S01 | P1 | sableux | pH 5.2 | sec');
});

test('listerObservations écrit une ligne par observation', () => {
  const lignes = listerObservations(DONNEES).split('\n');
  assert.equal(lignes.length, 10);
  assert.equal(lignes[1], 'S02 | P1 | limoneux | pH 6.1 | intermédiaire');
});

test('listerObservations affiche un message si le carnet est vide', () => {
  assert.equal(listerObservations([]), 'Aucune observation enregistrée.');
});

test('trouverParId : S04 renvoie P2, sableux, pH 4.8, sec', () => {
  const observation = trouverParId(DONNEES, 'S04');
  assert.equal(observation.parcelle, 'P2');
  assert.equal(observation.texture, 'sableux');
  assert.equal(observation.pH, 4.8);
  assert.equal(observation.etatHumidite, 'sec');
});

test('trouverParId : S99 est introuvable (undefined)', () => {
  assert.equal(trouverParId(DONNEES, 'S99'), undefined);
});

test('verifierObservation accepte une saisie valide', () => {
  assert.deepEqual(verifierObservation(SAISIE_VALIDE, DONNEES), []);
});

test('verifierObservation admet un pH de 14', () => {
  assert.deepEqual(verifierObservation({ ...SAISIE_VALIDE, pH: '14' }, DONNEES), []);
});

test('verifierObservation refuse un pH de 14,1, de -1 ou vide', () => {
  assert.notEqual(verifierObservation({ ...SAISIE_VALIDE, pH: '14,1' }, DONNEES).length, 0);
  assert.notEqual(verifierObservation({ ...SAISIE_VALIDE, pH: '-1' }, DONNEES).length, 0);
  assert.notEqual(verifierObservation({ ...SAISIE_VALIDE, pH: '' }, DONNEES).length, 0);
});

test('verifierObservation refuse un état d’humidité hors des trois modalités', () => {
  assert.notEqual(verifierObservation({ ...SAISIE_VALIDE, etatHumidite: 'mouillé' }, DONNEES).length, 0);
});

test('verifierObservation refuse un identifiant déjà utilisé', () => {
  assert.notEqual(verifierObservation({ ...SAISIE_VALIDE, id: 'S01' }, DONNEES).length, 0);
});

test('creerObservation convertit le pH en nombre', () => {
  assert.deepEqual(creerObservation(SAISIE_VALIDE), {
    id: 'S11',
    parcelle: 'P6',
    texture: 'limoneux',
    pH: 6.4,
    etatHumidite: 'humide',
  });
});

test('ajouterObservation ajoute une saisie valide à la fin du carnet', () => {
  const observations = copieDesDonnees();
  assert.deepEqual(ajouterObservation(observations, SAISIE_VALIDE), []);
  assert.equal(observations.length, 11);
  assert.equal(observations[10].id, 'S11');
});

test('ajouterObservation refuse un deuxième S01 : le carnet reste à dix observations', () => {
  const observations = copieDesDonnees();
  assert.notEqual(ajouterObservation(observations, { ...SAISIE_VALIDE, id: 'S01' }).length, 0);
  assert.equal(observations.length, 10);
});
