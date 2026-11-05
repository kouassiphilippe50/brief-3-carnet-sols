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
  console.log('3. Rechercher (point, parcelle, texture)');
  console.log('4. Trier par pH');
  console.log('5. Synthèse des observtions');
  console.log('6. Supprimer des observations');
  console.log('7. Modifier des observations');
  console.log('0. Quitter');
}

//---------------- Actions ------------------------------

//Choix 1 : poser les cinq questions, vérifier, ajouter, enregistrer.

async function ajouter(){
  console.log('----- Ajouter une observation -----');

  const id = await demander('point observé (ex. S11) : ');
  if (id === null) return;

  const parcelle = await demander('parcelle (ex. P1) : ');
  if (parcelle === null) return;

  const texture = await demander(`Texture (${TEXTURES.join(', ')}) : `);
  if (texture === null) return;

  const pH = await demander('pH (nombre de 0 à 14, sans unité, virgule acceptée) : ');
  if (pH === null) return;

  const etatHumidite = await demander (`Etat d'humidité (${HUMIDITES.join(', ')}) : `);
  if (etatHumidite === null) return;

  //Avant de verifier : point et parcelle en majuscules, texture et état d'humidité en miniscules; le pH reste tel quel.
  

  const saisie = {
    id: id.toUpperCase(),
    parcelle: parcelle.toUpperCase(),
    texture: texture.toLowerCase(),
    etatHumidite: etatHumidite.toLowerCase(),
    pH: pH,
  };

  const erreurs = ajouterObservation(observations, saisie);
  if (erreurs.length > 0){
    console.log('Observation refusée :');
    for (const erreur of erreurs){
      console.log(' - ' + erreur);
    }
    console.log(`Le carnet compte toujours ${observations.length} observation(s).`);
  }else{
  await enregistrerJson(FICHIER_DONNEES, observations);
  console.log(`Observation ${saisie.id} ajoutée. Le carnet compte ${observations.length} observations.`)
  }
}

// Choix 2 : Liste des observations
function lister(){
  console.log(`---- Liste des observations (${observations.length}) ---`);
  console.log(listerObservations(observations));
}

// Choix 3 : Recherche par point, parcelle , Texture.

async function rechercher(){
  console.log('------------- Rechercher ------------------');
  console.log('1. Par point (identifiant)');
  console.log('2. Par parcelle');
  console.log("3. Les observations d'une texture");

  const sousChoix = await demander('Votre choix : ');
  if(sousChoix === null) return;

  if (sousChoix === '1'){
    const reponse = await demander('point : ');
    if (reponse === null) return;
    const id = reponse.toUpperCase();
    const observation = trouverParId(observations, id);
    if (observation === undefined) {
      console.log(`observation ${id} introuvable.`);
    } else {
      console.log(formaterObservation(observation));
    }
  } else if (sousChoix === '2'){
    const reponse = await demander('parcelle : ');
    if (reponse === null) return;
    const parcelle = reponse.toUpperCase();
    const resultats = filtrerParParcelle(observations, parcelle);
    console.log(resultats.length + ' observation(s) sur la parcelle ' + parcelle + ' :');
    console.log(listerObservations(resultats));
  } else if (sousChoix === '3'){
    const reponse = await demander('Texture : ');
    if(reponse === null) return;
    const texture = reponse.toUpperCase();
    const resultats = filtrerParTexture(observations, texture);
    console.log(resultats.length + 'observation de texture ' + texture + ' :');
    console.log(listerObservations(resultats));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}

// choix 4 : trier par pH ()

async function trier(){
  console.log("-------------- Trier---------------");
  console.log("1. Par pH croissant ");
  const sousChoix =await demander("Votre choix : ");
  if (sousChoix === null) return;

  if (sousChoix === '1'){
    const observationsTriees = trierParPh(observations);
    console.log(listerObservations(trierParPh(observationsTriees)));
  } else {
    console.log("choix inconnu : retour Menu");
  }
}

// choix 5 : SYNTHESE
function synthese() {
  console.log("-------- Synthèse des observations-------------");
  console.log("Nombre d'observations : ", observations.length);

  const bornes = phMinMax(observations);
  if (bornes === null){
    console.log('pH minimum et maximum : aucune données');
  } else {
    console.log(` pH minimum : ${bornes.min} . pH maximum : ${bornes.max}`);
  }

  console.log("Observation par texture : ");
  const comptes = compterParTexture(observations);
  for (const[texture, nombre] of Object.entries(comptes)){
    console.log(` ${texture} : ${nombre}`);
  }

  const aDiscuter = pointsADiscuter(observations, SEUIL_PH_A_DISCUTER);
  console.log(` points à discuter avec le coach (pH < ${SEUIL_PH_A_DISCUTER}) : ${adiscuter.length}`);
  for (const observation of aDiscuter){
    console.log(` ${formaterObservation(observation)}`);
  }

  console.log("Rappels : le pH est sans unité. Aucune moyenne de pH n'est pas calculée (échelle logarithmique)");
  console.log("Ces points ne sont pas un diagnostic de fertilisation : ils servent à préparer l'échange avec le coach.");
}

//choix : 6 supprimer observation (bonus)

async function supprimer(observations){
  const saisie = await demander(' Identifiant: ');
  if(saisie === null) return;
  const id = saisie.toUpperCase();

  const suprrime = supprimerObservation(onservations, id);
  if (supprime === undefined){
    console.log(` ${id} introuvable. `);
    return;
  }
  await enregistrerJson(FICHIER_DONNEES, observations);
  console.log(` observation ${id} supprimée. Le carnet compte ${observations.length} observation(s). `)
}

// choix : 7 modifier le champ d'une observation (bonus)

async function modifier() {
  const saisieId = await demander(' Identifiant (Nouvelle valeur: ');
  if (saisieId === null) return;
  const id = saisieId.toUpperCase();

  const champ = await demander(`champ à modifier (${CHAMPS_MODIFIABLES.join(',')}) : `);
  if (champ === null) return;
  const valeurSaisie = await demander('Nouvelle valeur: ');
  if(valeurSaisie === null) return;

  let valeur = valeurSaisie;
    if (champ === 'parcelle') valeur = valeurSaisie.toLowerCase();
    if (champ === 'texture' || champ === 'etatHumidite') valeur = valeurSaisie.toLowerCase();
  
  const erreurs = modifierObservation(observations, id, champ, valeur);
    if (erreurs.length > 0) {
      console.log('Modification refusée :')
      for (const erreur of erreurs) {
        console.log(' -' + erreurs);
        await enregistrerJson(FICHIER_DONNEES, observations);
        return;
      }
  
      console.log(`Observation ${id} modifiée`);
    }
}
// PROGRAMME PRINCIPAL

async function main() {
  ouvrirSaisie();
  afficherAcceuil();

  // Chargement des données : si ça échoue, on continue avec un carnet vide.
  
  try {
    observations = await chargerJson(FICHIER_DONNEES);
    console.log(`${observations.length} observation(s) chargée(s) depuis ${FICHIER_DONNEES}`);
  } catch (erreur) {
    observations =[]
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. le carnet démarre vide`);
  }

  let continuer = true;
  while (continuer) {
    afficherMenu();
    const choix = await demander('votre choix : ');

    if (choix === null || choix === '0'){
      console.log('AU REVOIR !')
      continuer = false;
      continue;
    }

    try {
      switch (choix) {
        case '1' :
          await ajouter();
          break;
        case '2' :
          lister();
          break;
        case '3' :
          await rechercher();
          break;
        case '4' :
          await trier();
          break;
        case '5' :
          synthese();
          break;
          case '6' :
            await supprimer();
            break;
          case '7' :
            await modifier(); 
        case '0' :
          console.log('Au revoir !');
          continuer = false;
          break;
        default:
          console.log(` Choix inconnu : ${choix}. Tapez un chiffre du menu.`)
      }
    } catch (erreur){
      if (erreur.message.startsWith ("TODO")){
        console.log(`A complèter : ${erreur.message}`);
      } else{
        console.log(`Erreur inattendue : ${erreur.message}`);
      }
    }
  }
    fermerSaisie();
}

main();

