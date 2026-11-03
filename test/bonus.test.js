// Tests du BONUS (src/bonus.js) : ils restent rouges tant que le bonus n'est pas codé.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { modifierObservation, supprimerObservation, textureLaPlusFrequente, trierParPhDecroissant } from '../src/bonus.js';

// Copie figée des données de départ : vos ajouts dans donnees/observations.json ne changent pas les tests.
const DONNEES = JSON.parse(readFileSync(new URL('./donnees-test.json', import.meta.url), 'utf8'));

function copieDesDonnees() {
  return DONNEES.map((observation) => ({ ...observation }));
}

test('bonus : supprimerObservation retire S03 et la renvoie', () => {
  const observations = copieDesDonnees();
  const supprimee = supprimerObservation(observations, 'S03');
  assert.equal(supprimee.id, 'S03');
  assert.equal(observations.length, 9);
  assert.equal(observations.some((observation) => observation.id === 'S03'), false);
});

test('bonus : supprimerObservation d’un point inconnu renvoie undefined sans rien changer', () => {
  const observations = copieDesDonnees();
  assert.equal(supprimerObservation(observations, 'S99'), undefined);
  assert.equal(observations.length, 10);
});

test('bonus : modifierObservation change le pH, écrit avec une virgule, en nombre', () => {
  const observations = copieDesDonnees();
  assert.deepEqual(modifierObservation(observations, 'S03', 'pH', '6,9'), []);
  assert.equal(observations[2].pH, 6.9);
});

test('bonus : modifierObservation change la texture', () => {
  const observations = copieDesDonnees();
  assert.deepEqual(modifierObservation(observations, 'S01', 'texture', 'limoneux'), []);
  assert.equal(observations[0].texture, 'limoneux');
});

test('bonus : modifierObservation refuse un pH de 14,5 sans rien changer', () => {
  const observations = copieDesDonnees();
  assert.notEqual(modifierObservation(observations, 'S03', 'pH', '14,5').length, 0);
  assert.equal(observations[2].pH, 6.8);
});

test('bonus : modifierObservation refuse un point inconnu', () => {
  assert.equal(modifierObservation(copieDesDonnees(), 'S99', 'pH', '6').length, 1);
});

test('bonus : modifierObservation refuse de changer l’identifiant ou un champ inconnu', () => {
  const observations = copieDesDonnees();
  assert.notEqual(modifierObservation(observations, 'S03', 'id', 'S30').length, 0);
  assert.notEqual(modifierObservation(observations, 'S03', 'couleur', 'brun').length, 0);
  assert.deepEqual(observations, DONNEES);
});

test('bonus : trierParPhDecroissant commence par S08 et finit par S04, sur une copie', () => {
  const observations = copieDesDonnees();
  const triee = trierParPhDecroissant(observations);
  assert.equal(triee[0].id, 'S08');
  assert.equal(triee[9].id, 'S04');
  assert.equal(observations[0].id, 'S01');
});

test('bonus : textureLaPlusFrequente renvoie limoneux (4), ou null si le carnet est vide', () => {
  assert.deepEqual(textureLaPlusFrequente(DONNEES), { texture: 'limoneux', nombre: 4 });
  assert.equal(textureLaPlusFrequente([]), null);
});

test('bonus : textureLaPlusFrequente garde la première texture en cas d’égalité', () => {
  const observations = [DONNEES[2], DONNEES[0]]; // argileux puis sableux
  assert.deepEqual(textureLaPlusFrequente(observations), { texture: 'argileux', nombre: 1 });
});
