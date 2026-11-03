// Ajouter et lister les observations de sol.
// Fiche : fiches/3-ajouter-lister.md · Vérifier : npm run test:registre
import { versNombre } from './outils.js';

// Listes fermées des classes d'exercice, validées par le coach agronomie.
export const TEXTURES = ['sableux', 'limoneux', 'argileux'];
export const HUMIDITES = ['sec', 'intermédiaire', 'humide'];

// Renvoie une ligne de texte qui décrit l'observation.
// Exemple : 'S01 | P1 | sableux | pH 5.2 | sec'
export function formaterObservation(observation) {
  return `${ observation.id} | ${ observation.parcelle} | ${ observation.texture} | pH ${observation.pH} | ${observation.etatHumidite}`;
}

// Renvoie un texte avec une observation par ligne (lignes séparées par '\n'),
// ou 'Aucune observation enregistrée.' si la liste est vide.
export function listerObservations(observations) {
  if (observations.length===0){
    return `Aucune observation enregistrée.`;
  }else{
    return observations.map(formaterObservation).join('\n'); //(map) effectuer des transformations sur le tableau
     // (join) un separateur les elements d'un tableau ensuite les transforme en texte.
  }
}

// Renvoie l'observation qui a cet identifiant de point, ou undefined si elle n'existe pas.
export function trouverParId(observations, id) {
  return observations.find(observations => observations.id === id); //(find) trouver un element dans le tableau
}

// Contrôle une saisie AVANT de l'ajouter. Tous les champs arrivent sous forme de TEXTE :
// { id: 'S11', parcelle: 'P6', texture: 'limoneux', pH: '5,8', etatHumidite: 'humide' }
// Renvoie un tableau de messages d'erreur, un message par règle non respectée ;
// un tableau vide signifie « saisie valide ».
// Règles : id obligatoire et unique · parcelle obligatoire (n'importe quel texte non vide)
// · texture présente dans TEXTURES · pH nombre entre 0 et 14 (bornes comprises)
// · etatHumidite présent dans HUMIDITES. N'ajoutez aucune autre règle que celles-ci.
export function verifierObservation(saisie, observations){
  
  const Erreur = [];
    
  if (saisie.id===""){
     Erreur.push("id est obligatoire"); // (push) affichez le dernier element du tableau.
  }else{
      for (const Obs of observations){
        if (Obs.id===saisie.id){
          Erreur.push("id existe déjà");
        }
      }

  if (TEXTURES.includes(!saisie.texture)){  //(includes) option de recherche d'un elemebt dans un tableau
    Erreur.push(`veuillez entrer une texture valide : ${TEXTURES}`);
  } 
  
   const ph= versNombre(saisie.pH);
  if (Number.isFinite(ph)===false || ph<0 || ph>14){
    Erreur.push(`veuillez entrer un pH valide compris entre 0 et 14`);
  }

  if (saisie.parcelle.trim()===''){   //(trim()) effacer les espaces aux extremités
    Erreur.push(`veuillez entrer obligatoirement une parcelle validé`);
  }

  if (!HUMIDITES.includes(saisie.etatHumidite)){
    Erreur.push(`vous devez entrer une valeur compris: ${HUMIDITES}`)
  }
 return Erreur;
  }
}
// Fabrique l'observation à enregistrer à partir d'une saisie VALIDE : pH devient un nombre.
export function creerObservation(saisie) {
  const valide= {...saisie};
  valide.pH = versNombre(saisie.pH);
  return valide;
}

// Ajoute la saisie au carnet si elle est valide (verifierObservation, puis creerObservation).
// Renvoie les erreurs : [] si l'observation a été ajoutée ; sinon les messages, et rien n'est ajouté.
export function ajouterObservation(observations, saisie) {
  const Error = verifierObservation(saisie,observations);
  if (Error.length>0) {
    return Error;
  }
  const observation = creerObservation(saisie);{
    observations.push(observation);
    return[];
  }
}
