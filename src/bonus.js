// BONUS — Pour aller plus loin. Facultatif : commencez seulement quand le socle est complet.
// Fiche : fiches/7-bonus.md · Vérifier : npm run test:bonus
// Ni pseudo-code de référence ni aide détaillée : à vous de combiner ce que vous avez appris.
// Les choix 6 et 7 du menu sont à écrire vous-même dans app.js (voir la fiche).
import { versNombre } from './outils.js';
import { trouverParId, verifierObservation } from './registre.js';
import { compterParTexture } from './synthese.js';

// Les champs qu'on a le droit de modifier. L'identifiant n'en fait pas partie.
export const CHAMPS_MODIFIABLES = ['parcelle', 'texture', 'pH', 'etatHumidite'];

// Supprime du carnet l'observation qui a cet identifiant.
// Renvoie l'observation supprimée, ou undefined si elle n'existe pas (le carnet ne change pas).
export function supprimerObservation(observations, id) {

  const position = observations.findIndex(observation => observation.id === id); //(findIndex) permet de trouver en fonction de l'index.

  if (position===-1){
    return undefined
  } else {
    const conserveSuppression = observations.splice(position,1); //(splice) permet de retirer,remplacer et transformer un element à partir de l'index.
    return conserveSuppression[0];
  }
}

// Modifie UN champ d'une observation. La nouvelle valeur arrive sous forme de TEXTE et suit
// les mêmes règles qu'à l'ajout. Renvoie les erreurs : [] si la modification est faite ;
// sinon les messages, et l'observation ne change pas. Le pH modifié est enregistré comme un nombre.
// Erreurs : identifiant introuvable · champ 'id' (non modifiable) · champ absent de CHAMPS_MODIFIABLES
//           · valeur refusée par les règles de l'ajout.
export function modifierObservation(observations, id, champ, valeur) {

  const erreurs=[];
  const observation= trouverParId(observations,id);

  if (!observation){
    erreurs.push("Identifiant introuvable");
    return erreurs;
  }
  if (champ === 'id'){
    erreurs.push("champ 'id' n'est pas modifiable");
    return erreurs;
   }
  if(!CHAMPS_MODIFIABLES.includes(champ)){
    erreurs.push("champ absent des CHAMPS_MODIFIABLES autorisés.");
    return erreurs;
  } 

  let valeur_ph_saisie = valeur;
  if(champ === 'pH'){
    valeur_ph_saisie= versNombre(valeur);
  if (isNaN(valeur_ph_saisie) || valeur_ph_saisie <0 || valeur_ph_saisie > 14){
    erreurs.push(" la valeur de pH doit etre compris entre 0 et 14");
  } 
 }

 if(erreurs.length > 0){
  return erreurs;
 }
    observation[champ] = valeur_ph_saisie;
 return [];

}

// Renvoie une COPIE triée par pH décroissant. Le tableau reçu ne doit pas changer d'ordre.
export function trierParPhDecroissant(observations) {
  return [...observations].sort ((a,b) => b.pH - a.pH); //(sort) permet de modifier dans le tableau d'origine
}

// Renvoie { texture, nombre } pour la texture la plus fréquente, ou null si la liste est vide.
// En cas d'égalité, la première texture rencontrée l'emporte.
// Exemple : { texture: 'limoneux', nombre: 4 }
export function textureLaPlusFrequente(observations) {

   if (!observations || observations.length === 0){
    return null;
  }
   const comptage = compterParTexture(observations);
  let textureMax = null;
  let nombreMax = 0;

  for (const obs of observations) {
    const texture = obs.texture;
    if(texture && comptage [texture]> nombreMax) {
      nombreMax = comptage[texture];
      textureMax = texture;
    }
  }
  if (!textureMax) {
    return null;
  }
  return { texture: textureMax, nombre: nombreMax};
}
