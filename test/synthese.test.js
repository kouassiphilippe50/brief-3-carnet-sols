import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SEUIL_PH_A_DISCUTER, compterParTexture, phMinMax, pointsADiscuter } from '../src/synthese.js';

// Copie figée des données de départ : vos ajouts dans donnees/observations.json ne changent pas les tests.
const DONNEES = JSON.parse(readFileSync(new URL('./donnees-test.json', import.meta.url), 'utf8'));

test('phMinMax : le pH minimum est 4.8, le maximum 7.6', () => {
  assert.deepEqual(phMinMax(DONNEES), { min: 4.8, max: 7.6 });
});

test('phMinMax d’un carnet vide renvoie null (« aucune donnée »)', () => {
  assert.equal(phMinMax([]), null);
});

test('compterParTexture : 3 sableux, 4 limoneux et 3 argileux', () => {
  assert.deepEqual(compterParTexture(DONNEES), { sableux: 3, limoneux: 4, argileux: 3 });
});

test('pointsADiscuter : quatre points ont un pH < 5.5 (S01, S04, S06, S09)', () => {
  const resultat = pointsADiscuter(DONNEES, SEUIL_PH_A_DISCUTER);
  assert.deepEqual(resultat.map((observation) => observation.id), ['S01', 'S04', 'S06', 'S09']);
});

test('pointsADiscuter utilise strictement < : un pH de 5.5 n’est pas dans la liste', () => {
  const observations = [
    { id: 'X1', parcelle: 'P1', texture: 'sableux', pH: 5.5, etatHumidite: 'sec' },
    { id: 'X2', parcelle: 'P1', texture: 'sableux', pH: 5.4, etatHumidite: 'sec' },
  ];
  assert.deepEqual(pointsADiscuter(observations, 5.5).map((observation) => observation.id), ['X2']);
});
