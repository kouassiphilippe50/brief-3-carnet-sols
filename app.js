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

//-------------- Affichages -------------------------------------

function afficherAccueil() {
  console.log('===========================================');
  console.log('CARNET OBSERVATION DES SOLS - Ferme pédagogique');
  console.log('===========================================');
}

function afficherMenu() {
  console.log('');
  console.log('------------------ MENU ----------------');
  console.log('1. Ajouter une observation');
  console.log('2. Lister les observations');
  console.log('3. Rechercher (point, parcelle, texture)');
  console.log('4. Trier par pH');
  console.log('5. Synthèse des observations');
  console.log('6. Supprimer une observation');
  console.log('7. Modifier une observation');
  console.log('0. Quitter');
}

//---------------- Actions ------------------------------

// Choix 1 : poser les cinq questions, vérifier, ajouter, enregistrer.
async function ajouter(observations) {
  console.log('----- Ajouter une observation -----');

  const id = await demander('Point observé (ex. S11) : ');
  if (id === null) return;

  const parcelle = await demander('Parcelle (ex. P1) : ');
  if (parcelle === null) return;

  const texture = await demander(`Texture (${TEXTURES.join(', ')}) : `);
  if (texture === null) return;

  const pH = await demander('pH (nombre de 0 à 14, sans unité, virgule acceptée) : ');
  if (pH === null) return;

  const etatHumidite = await demander(`État d'humidité (${HUMIDITES.join(', ')}) : `);
  if (etatHumidite === null) return;

  // Point et parcelle en majuscules, texture et état d'humidité en minuscules ; le pH reste tel quel.
  const saisie = {
    id: id.toUpperCase(),
    parcelle: parcelle.toUpperCase(),
    texture: texture.toLowerCase(),
    etatHumidite: etatHumidite.toLowerCase(),
    pH: pH,
  };

  const erreurs = ajouterObservation(observations, saisie);
  if (erreurs.length > 0) {
    console.log('Observation refusée :');
    for (const erreur of erreurs) {
      console.log(' - ' + erreur);
    }
    console.log(`Le carnet compte toujours ${observations.length} observation(s).`);
  } else {
    await enregistrerJson(FICHIER_DONNEES, observations);
    console.log(`Observation ${saisie.id} ajoutée. Le carnet compte ${observations.length} observation(s).`);
  }
}

// Choix 2 : lister les observations
function lister(observations) {
  console.log(`---- Liste des observations (${observations.length}) ---`);
  console.log(listerObservations(observations));
}

// Choix 3 : rechercher par point, parcelle ou texture
async function rechercher(observations) {
  console.log('------------- Rechercher ------------------');
  console.log('1. Par point (identifiant)');
  console.log('2. Par parcelle');
  console.log("3. Les observations d'une texture");

  const sousChoix = await demander('Votre choix : ');
  if (sousChoix === null) return;

  if (sousChoix === '1') {
    const reponse = await demander('Point : ');
    if (reponse === null) return;
    const id = reponse.toUpperCase();
    const observation = trouverParId(observations, id);
    if (observation === undefined) {
      console.log(`Observation ${id} introuvable.`);
    } else {
      console.log(formaterObservation(observation));
    }
  } else if (sousChoix === '2') {
    const reponse = await demander('Parcelle : ');
    if (reponse === null) return;
    const parcelle = reponse.toUpperCase();
    const resultats = filtrerParParcelle(observations, parcelle);
    console.log(resultats.length + ' observation(s) sur la parcelle ' + parcelle + ' :');
    console.log(listerObservations(resultats));
  } else if (sousChoix === '3') {
    const reponse = await demander('Texture : ');
    if (reponse === null) return;
    const texture = reponse.toLowerCase(); // les textures sont en MINUSCULES
    const resultats = filtrerParTexture(observations, texture);
    console.log(resultats.length + ' observation(s) de texture ' + texture + ' :');
    console.log(listerObservations(resultats));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}

// Choix 4 : trier par pH
async function trier(observations) {
  console.log('-------------- Trier ---------------');
  console.log('1. Par pH croissant');
  const sousChoix = await demander('Votre choix : ');
  if (sousChoix === null) return;

  if (sousChoix === '1') {
    const observationsTriees = trierParPh(observations);
    console.log(listerObservations(observationsTriees));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}

// Choix 5 : synthèse
function synthese(observations) {
  console.log('-------- Synthèse des observations -------------');
  console.log("Nombre d'observations : " + observations.length);

  const bornes = phMinMax(observations);
  if (bornes === null) {
    console.log('pH minimum et maximum : aucune donnée');
  } else {
    console.log(` pH minimum : ${bornes.min} . pH maximum : ${bornes.max}`);
  }

  console.log('Observations par texture :');
  const comptes = compterParTexture(observations);
  for (const [texture, nombre] of Object.entries(comptes)) {
    console.log(` ${texture} : ${nombre}`);
  }

  const aDiscuter = pointsADiscuter(observations, SEUIL_PH_A_DISCUTER);
  console.log(` Points à discuter avec le coach (pH < ${SEUIL_PH_A_DISCUTER}) : ${aDiscuter.length}`);
  for (const observation of aDiscuter) {
    console.log(` ${formaterObservation(observation)}`);
  }

  console.log("Rappels : le pH est sans unité. Aucune moyenne de pH n'est calculée (échelle logarithmique).");
  console.log("Ces points ne sont pas un diagnostic de fertilisation : ils servent à préparer l'échange avec le coach.");
}

// Choix 6 : supprimer une observation (bonus)
async function supprimer(observations) {
  console.log('----- Supprimer une observation -----');
  const saisie = await demander('Identifiant : ');
  if (saisie === null) return;
  const id = saisie.toUpperCase();

  const observation = trouverParId(observations, id);
  if (observation === undefined) {
    console.log(`${id} introuvable.`);
    return;
  }

  // On retrouve la position de l'observation dans la liste, puis on la retire.
  const position = observations.indexOf(observation);
  observations.splice(position, 1);

  await enregistrerJson(FICHIER_DONNEES, observations);
  console.log(`Observation ${id} supprimée. Le carnet compte ${observations.length} observation(s).`);
}

// Choix 7 : modifier un champ d'une observation (bonus)
async function modifier(observations) {
  console.log('----- Modifier une observation -----');
  const saisieId = await demander('Identifiant : ');
  if (saisieId === null) return;
  const id = saisieId.toUpperCase();

  const champ = await demander(`Champ à modifier (${CHAMPS_MODIFIABLES.join(', ')}) : `);
  if (champ === null) return;

  const valeurSaisie = await demander('Nouvelle valeur : ');
  if (valeurSaisie === null) return;

  let valeur = valeurSaisie;
  if (champ === 'parcelle') valeur = valeurSaisie.toUpperCase();
  if (champ === 'texture' || champ === 'etatHumidite') valeur = valeurSaisie.toLowerCase();

  const erreurs = modifierObservation(observations, id, champ, valeur);
  if (erreurs.length > 0) {
    console.log('Modification refusée :');
    for (const erreur of erreurs) {
      console.log(' - ' + erreur);
    }
    return;
  }

  await enregistrerJson(FICHIER_DONNEES, observations);
  console.log(`Observation ${id} modifiée.`);
}

//---------------- Programme principal ------------------------------

async function main() {
  ouvrirSaisie();
  afficherAccueil();

  // On déclare la variable AVANT de s'en servir.
  let observations;

  // Chargement des données : si ça échoue, on continue avec un carnet vide.
  try {
    observations = await chargerJson(FICHIER_DONNEES);
    console.log(`${observations.length} observation(s) chargée(s) depuis ${FICHIER_DONNEES}`);
  } catch (erreur) {
    observations = [];
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. Le carnet démarre vide.`);
  }

  let continuer = true;
  while (continuer) {
    afficherMenu();
    const choix = await demander('Votre choix : ');

    if (choix === null || choix === '0') {
      console.log('Au revoir !');
      continuer = false;
      continue;
    }

    try {
      // On donne « observations » à chaque action, sinon elle ne sait pas quoi utiliser.
      switch (choix) {
        case '1':
          await ajouter(observations);
          break;
        case '2':
          lister(observations);
          break;
        case '3':
          await rechercher(observations);
          break;
        case '4':
          await trier(observations);
          break;
        case '5':
          synthese(observations);
          break;
        case '6':
          await supprimer(observations);
          break;
        case '7':
          await modifier(observations);
          break;
        default:
          console.log(`Choix inconnu : ${choix}. Tapez un chiffre du menu.`);
      }
    } catch (erreur) {
      if (erreur.message.startsWith('TODO')) {
        console.log(`À compléter : ${erreur.message}`);
      } else {
        console.log(`Erreur inattendue : ${erreur.message}`);
      }
    }
  }

  fermerSaisie();
}

main();
