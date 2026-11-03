# 3. Le menu, ajouter et lister

**Vos fichiers :** `src/registre.js`, puis `app.js` (le menu, choix 1 et 2) · **Vos tests :** `npm run test:registre` (13 tests fournis)

Une observation est un objet ; le carnet est un tableau d'observations :

```js
{ id: 'S04', parcelle: 'P2', texture: 'sableux', pH: 4.8, etatHumidite: 'sec' }
```

Codez les fonctions dans l'ordre : chacune sert aux suivantes. Les tests fournis montrent ce que chacune doit renvoyer.

## Le menu (`app.js`)

`app.js` ne contient que les imports et le nom du fichier de données : écrivez tout le menu. Comportement imposé :

1. Au lancement : l'écran d'accueil, puis les données lues avec `chargerJson` et le message `10 observation(s) chargée(s) depuis donnees/observations.json.`. Si la lecture échoue : `Impossible de lire donnees/observations.json : <message de l'erreur>. Le carnet démarre vide.`, et le programme continue avec une liste vide.
2. Avant **chaque** choix, le menu s'affiche, puis la question `Votre choix : `. Lisez `src/saisie.js` (`ouvrirSaisie`, `demander`, `fermerSaisie`).
3. Chaque choix lance son action, puis le menu revient.
4. `0` quitte en affichant `Au revoir !` ; le programme quitte aussi si `demander` renvoie `null` (Ctrl+C).
5. Un autre choix affiche `Choix inconnu : « 9 ». Tapez un chiffre du menu.`, puis le menu revient.
6. Aucune erreur n'arrête le programme : affichez `À compléter : …` (le message de l'erreur) si elle vient d'une fonction pas encore codée (message commençant par `TODO`), sinon `Erreur inattendue : …`, puis le menu revient.

```text
==================================================
   Ferme pédagogique
==================================================
10 observation(s) chargée(s) depuis donnees/observations.json.

--------------------- MENU ---------------------
1. Ajouter une observation
2. Lister les observations
3. Rechercher (point, parcelle, texture)
4. Trier par pH
5. Synthèse des observations
0. Quitter
Votre choix :
```

Pistes : quelle boucle répète des instructions tant qu'une condition est vraie ? Quelle instruction choisit entre plusieurs cas selon une valeur ? Cherchez comment attraper une erreur. Écrivez d'abord le menu avec des actions vides, puis remplissez-les une à une.

## 1. `formaterObservation(observation)`

Renvoie une ligne de texte : `'S01 | P1 | sableux | pH 5.2 | sec'`.

**À vous.** Piste : un gabarit de chaîne `` `${…}` ``.

## 2. `listerObservations(observations)`

Renvoie une observation par ligne (pas de retour à la ligne après la dernière), ou `'Aucune observation enregistrée.'` si le tableau est vide.

**À vous.** Pistes : réutilisez `formaterObservation` ; cherchez une méthode des tableaux qui rassemble les éléments en un texte, avec un séparateur.

## 3. `trouverParId(observations, id)`

Renvoie l'observation (l'objet du carnet lui-même) ou `undefined`.

**À vous.** Pistes : arrêtez la recherche dès que c'est trouvé ; que renvoyer si rien ne correspond ?

## 4. `verifierObservation(saisie, observations)`

Tous les champs de la saisie sont des **textes** : `{ id: 'S11', parcelle: 'P6', texture: 'limoneux', pH: '5,8', etatHumidite: 'humide' }`. Renvoie un tableau de messages d'erreur, **un par règle non respectée** ; `[]` signifie « valide ». Ne modifie pas le carnet.

| Champ | Règle |
| --- | --- |
| `id` | obligatoire, et absent du carnet reçu |
| `parcelle` | obligatoire : n'importe quel texte non vide |
| `texture` | présente dans `TEXTURES` |
| `pH` | un nombre de 0 à 14, **bornes comprises** (`14` admis ; `14,1`, `-1` et vide refusés) ; virgule acceptée |
| `etatHumidite` | présent dans `HUMIDITES` |

N'ajoutez aucune autre règle.

**À vous** : écrivez d'abord l'algorithme complet, sur papier. Pistes : `src/outils.js` contient un outil de conversion ; que vaut `Number('')`, et `Number('5,8')` ? Quels opérateurs de comparaison admettent 0 et 14 ? Cherchez une méthode des tableaux qui dit si une valeur fait partie d'une liste.

## 5. `creerObservation(saisie)`

Renvoie un **nouvel** objet, avec `pH` converti en nombre (`'5,8'` devient `5.8`).

**À vous.**

## 6. `ajouterObservation(observations, saisie)`

Si la saisie est valide, ajoute l'observation à la fin du carnet et renvoie `[]`. Sinon, renvoie les erreurs sans rien ajouter.

**Pseudo-code de référence :**

```text
erreurs ← verifierObservation(saisie, observations)
SI erreurs n'est pas vide ALORS
  RENVOYER erreurs
FIN SI
ajouter creerObservation(saisie) à la fin de observations
RENVOYER une liste vide
```

## 7. Les choix 1 et 2 (`app.js`)

Écrivez les actions `ajouter` et `lister`. Le dialogue est **imposé** : le formateur le joue automatiquement.

```text
--- Ajouter une observation ---
Point observé (ex. S11) : s11
Parcelle (ex. P1) : p6
Texture (sableux, limoneux, argileux) : Limoneux
pH (nombre de 0 à 14, sans unité, virgule acceptée) : 5,8
État d'humidité (sec, intermédiaire, humide) : Humide
Observation S11 ajoutée. Le carnet compte 11 observation(s).
```

- Les cinq questions dans cet ordre, avec `demander` (voir `src/saisie.js`) ; les listes des questions viennent de `TEXTURES` et `HUMIDITES`.
- Avant de vérifier : point et parcelle en majuscules, texture et état d'humidité en minuscules ; le pH reste tel quel. Cherchez comment changer la casse d'un texte.
- Ajout réussi : enregistrez le carnet dans `donnees/observations.json` (fiche 2), puis affichez la ligne ci-dessus.
- Saisie refusée :

  ```text
  Observation refusée :
    - Le pH doit être un nombre entre 0 et 14.
  Le carnet compte toujours 10 observation(s).
  ```

- Si `demander` renvoie `null` (Ctrl+C), abandonnez l'ajout.

```text
--- Liste des observations (10) ---
S01 | P1 | sableux | pH 5.2 | sec
…
```

## Vérifier

- `npm run test:registre`.
- Dans le menu : ajoutez `S11` ; essayez chaque règle avec une valeur interdite et un nouvel identifiant, et les bornes `0`, `14`, `14,1` ; essayez une saisie avec trois erreurs. Notez les résultats dans `docs/releve-tests.md`.
