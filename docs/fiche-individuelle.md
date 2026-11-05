# Fiche individuelle

> Une page, avant la livraison. Prénom, nom, compte GitHub : Kouakou philippe alexandre KOUASSI, kouassiphilippe50

1. **Une fonction que j'ai écrite**, et comment elle marche :
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
2. **Une difficulté, et sa solution** :

 
3. **L'entraide** (qui m'a aidé, qui j'ai aidé, sur quoi) : 
qui m'a aidé : un collegue de la promotion m'a aidé quand mon menu plantait, il m'a fait remarquer que demander() renvoe du texte alors je devais ecrire case'1' et non case 1.
qui j'ai aidé : j'ai aidé un collegue à relire son code ligne par ligne pour trouver une faute qui empêchait son terminal d'excuter son code , aussi j'ai aidé des collegues à cloner son github.
Ce que j’en retiens : expliquer une erreur à quelqu’un m’aide aussi à la comprendre. Ma formation de base en génie civil m’a habitué à vérifier chaque étape, et je l’applique maintenant à mon code.
