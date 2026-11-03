# 7. Bonus — pour aller plus loin

**Vos fichiers :** `src/bonus.js`, puis `app.js` · **Vos tests :** `npm run test:bonus` (10 tests)

Seulement quand le socle est complet. Pas de pseudo-code de référence ni de piste détaillée : combinez ce que vous avez appris, cherchez ce qui manque, et sachez expliquer ce code en soutenance.

## Les fonctions (`src/bonus.js`, +1)

- **`supprimerObservation(observations, id)`** : retire l'observation du carnet et la renvoie ; `undefined` si elle n'existe pas (le carnet ne change pas). Piste : il faut sa position dans le tableau, puis la retirer à cette position ; cherchez une méthode des tableaux pour chaque étape.
- **`modifierObservation(observations, id, champ, valeur)`** : modifie un champ ; la valeur arrive en texte et suit les règles de l'ajout (le pH devient un nombre). Renvoie les erreurs (`[]` si c'est fait). Erreur si l'identifiant est introuvable, si `champ` vaut `'id'`, si `champ` n'est pas dans `CHAMPS_MODIFIABLES`, ou si la valeur est refusée ; dans ce cas, rien ne change. Pistes : les règles existent déjà dans `verifierObservation` ; attention, l'observation ne doit pas être vue comme un doublon d'elle-même.
- **`trierParPhDecroissant(observations)`** : une copie, le pH le plus élevé d'abord.
- **`textureLaPlusFrequente(observations)`** : `{ texture: 'limoneux', nombre: 4 }` avec les données de départ ; `null` si le carnet est vide ; en cas d'égalité, la première rencontrée.

## Le menu (`app.js`, +1)

Ajoutez au menu `6. Supprimer une observation` et `7. Modifier une observation`, et importez vos fonctions de `src/bonus.js`. Dialogue **imposé** :

| Choix | Questions, dans l'ordre | Affichage |
| --- | --- | --- |
| `6` | `Identifiant : ` (en majuscules) | `Observation S03 supprimée. Le carnet compte 9 observation(s).` ou `Observation S99 introuvable.` |
| `7` | `Identifiant : ` (en majuscules), `Champ à modifier (parcelle, texture, pH, etatHumidite) : `, `Nouvelle valeur : ` | `Observation S03 modifiée.` ou `Modification refusée :` puis une erreur par ligne (`  - …`) |

Après une suppression ou une modification réussie, enregistrez le carnet dans `donnees/observations.json`.

Deux ajouts d'affichage, comptés dans ce point :

- sous-menu **Trier** : `2. Par pH décroissant`, la liste s'affichant juste après le choix ;
- **synthèse**, juste après les lignes par texture : `Texture la plus fréquente : limoneux (4 observation(s))`, ou `Texture la plus fréquente : aucune donnée` si le carnet est vide.

Le formateur joue ces scénarios dans votre `app.js` : relancez `node app.js` après chaque modification.
