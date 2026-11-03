import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { filtrerParParcelle, filtrerParTexture, trierParPh } from '../src/recherche.js';

// Copie figée des données de départ : vos ajouts dans donnees/observations.json ne changent pas les tests.
const DONNEES = JSON.parse(readFileSync(new URL('./donnees-test.json', import.meta.url), 'utf8'));

function ids(observations) {
  return observations.map((observation) => observation.id);
}

test('filtrerParParcelle garde les observations de la parcelle P2', () => {
  assert.deepEqual(ids(filtrerParParcelle(DONNEES, 'P2')), ['S03', 'S04']);
});

test('filtrerParTexture garde les observations limoneuses', () => {
  assert.deepEqual(ids(filtrerParTexture(DONNEES, 'limoneux')), ['S02', 'S05', 'S07', 'S10']);
});

test('trierParPh : le tri croissant commence par S04 et finit par S08', () => {
  const triee = trierParPh(DONNEES);
  assert.equal(triee[0].id, 'S04');
  assert.equal(triee[9].id, 'S08');
});

test('trierParPh utilise un comparateur numérique', () => {
  const valeurs = trierParPh(DONNEES).map((observation) => observation.pH);
  assert.deepEqual(valeurs, [4.8, 5.1, 5.2, 5.4, 6.1, 6.3, 6.5, 6.8, 7.2, 7.6]);
});

test('trierParPh ne modifie pas le carnet d’origine', () => {
  const observations = DONNEES.map((observation) => ({ ...observation }));
  trierParPh(observations);
  assert.deepEqual(ids(observations), ids(DONNEES));
});
