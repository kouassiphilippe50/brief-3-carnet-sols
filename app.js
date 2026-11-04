// Carnet d'observation des sols — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { HUMIDITES, TEXTURES, ajouterObservation, formaterObservation, listerObservations, trouverParId } from './src/registre.js';
import { filtrerParParcelle, filtrerParTexture, trierParPh } from './src/recherche.js';
import { SEUIL_PH_A_DISCUTER, compterParTexture, phMinMax, pointsADiscuter } from './src/synthese.js';

const FICHIER_DONNEES = 'donnees/observations.json';

//--------------affiches-------------------------------------

function afficherAcceuil() {
  console.log('===========================================');
  console.log('CARNET OBSERVATION DES SOLS Ferme pédagogique');
  console.log('===========================================');
}

function afficherMenu(){
  console.log('');
  console.log('------------------MENU----------------');
  console.log('1. Ajouter une observation');
  console.log('2. Lister les observations');
  console.log('3. Rechercher (point, parcelle, texture');
  console.log('4. Trier par pH');
  console.log('5. Synthèse des observtions');
  console.log('0. Quitter');
  console.log(' Votre choix :');
}

//---------------- Actions ------------------------------

//Choix 1 : poser les cinq questions, vérifier, ajouter, enregistrer.

async function ajouter(observations){
  console.log('----- Ajouter une observation -----');

  const id = await demander('point observé (ex. S11) : s11');
  if (id === null) return;
  const parcelle = await demander('parcelle (ex. P1) : p6');
  if (parcelle === null) return;
  const texture = await demander(`Texture (${TEXTURES.join(', ')}) : Limoneux `);
  if (parcelle === null) return;
  const pH = await demander('pH (nombre de 0 à 14, sans unité, virgule acceptée) : 5,8');
  if (pH === null) return;
  const etatHumidite = await demander (`Etat d'humidité (${HUMIDITES.join(', ')}) : humide`);
  if (etatHumidite === null) return;
}

async function main() {
  ouvrirSaisie();
  console.log("À compléter : écrivez le menu dans app.js (fiches/3-ajouter-lister.md).");
  fermerSaisie();
}

main();

