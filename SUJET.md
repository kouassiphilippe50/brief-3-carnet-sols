# Brief 3 — Carnet d'observation des sols

**Examen final de sélection · travail individuel.** Quatre jours de travail, organisés comme vous le voulez. Livraison à l'heure fixée par les coachs, à la fin du quatrième jour ; soutenance individuelle le lendemain.

## Le besoin

L'équipe de la ferme pédagogique relève des points de sol : texture, pH, état d'humidité. Elle veut retrouver ces relevés et repérer les valeurs à discuter avec l'agronome. Vous êtes assistant terrain Agritech : vous construisez ce carnet en JavaScript, avec Node.js, **sans produire de diagnostic de fertilisation**.

- **Besoin professionnel** : conserver les observations, retrouver les points concernés et repérer les valeurs à vérifier avec le coach.
- **Geste professionnel** : observer un point avec la fiche de terrain, renseigner une classe de texture et une valeur de pH, puis relier ces observations aux interactions entre l'eau, le sol et la plante.

## Ce que vous construisez

```text
==================================================
   CARNET D'OBSERVATION DES SOLS
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

Les observations sont lues dans `donnees/observations.json`, et chaque ajout y est enregistré.

## Le kit

| Fichier | Contenu | Votre travail |
| --- | --- | --- |
| `app.js` | Les imports et le nom du fichier de données | Écrire tout le menu : accueil, chargement, menu affiché à chaque tour, actions, sortie, erreurs |
| `src/stockage.js` | Lire et écrire le fichier JSON | À coder en premier |
| `src/registre.js` | Formater, lister, trouver, vérifier, créer, ajouter | À coder |
| `src/recherche.js` | Filtrer et trier | À coder |
| `src/synthese.js` | pH minimum et maximum, comptage par texture, points à discuter | À coder |
| `src/bonus.js` | Supprimer, modifier, tri décroissant, texture la plus fréquente | Bonus |
| `src/saisie.js`, `src/outils.js` | Saisie au clavier ; `versNombre` (`estDateValide` ne sert pas ici) | Fournis : à utiliser, pas à modifier |
| `donnees/observations.json` | Les dix observations de départ (fictives) | Modifié par votre programme |
| `test/` | Les tests fournis ; `donnees-test.json` est une copie figée des données de départ | Ne pas modifier ; vous pouvez ajouter des tests |
| `fiches/` | Le détail de chaque partie | À lire |
| `docs/`, `README.md` | Vos livrables écrits | À compléter |
| Fiche de terrain | Remise par le coach agronomie | À citer |

## Démarrer

1. Vérifiez `node --version` (20 ou plus) et `git --version`. Configurez Git **à votre nom** :
   `git config --global user.name "Prénom NOM"` et `git config --global user.email "vous@exemple.com"`.
2. Créez sur GitHub un dépôt **vide** `brief-3-carnet-sols`. Ouvrez le dossier du kit dans VS Code, puis dans son terminal :

   ```powershell
   git init
   git add .
   git commit -m "Départ du brief 3 : kit fourni"
   git branch -M main
   git remote add origin https://github.com/VOTRE-COMPTE/brief-3-carnet-sols.git
   git push -u origin main
   ```

3. `node app.js` affiche seulement « À compléter » : le menu est à écrire. `npm test` affiche **3 tests verts** (les outils fournis) et **36 rouges**.

Si PowerShell bloque `npm`, tapez `npm.cmd` à la place (`npm.cmd test`, `npm.cmd run test:registre`). Pour retrouver les données de départ : `git restore donnees/observations.json`.

## Repères

Organisez votre temps comme vous le voulez. Ordre conseillé, chaque étape s'appuyant sur la précédente :

| Étape | Fiche | Vérifier |
| --- | --- | --- |
| 1. Comprendre le besoin, préparer le poste, planifier | `fiches/1-concevoir.md` | `npm test` |
| 2. Lire et écrire le JSON | `fiches/2-donnees-json.md` | `npm run test:stockage` |
| 3. Le menu ; ajouter et lister ; choix 1 et 2 | `fiches/3-ajouter-lister.md` | `npm run test:registre` |
| 4. Rechercher et trier ; choix 3 et 4 | `fiches/4-rechercher-trier.md` | `npm run test:recherche` |
| 5. Synthèse ; choix 5 | `fiches/5-synthese.md` | `npm run test:synthese` |
| 6. Tester, documenter, livrer, préparer la soutenance | `fiches/6-finaliser.md` | `npm test` |
| Bonus | `fiches/7-bonus.md` | `npm run test:bonus` |

Repère de mi-parcours : les étapes 1 à 3 sont faites. Gardez la dernière demi-journée pour l'étape 6.

## Les règles

- **Individuel.** L'entraide est permise : expliquer, sans écrire le code de l'autre. Notez-la dans `docs/fiche-individuelle.md`.
- **Pas d'exemple de code.** Deux fonctions ont un pseudo-code de référence dans leur fiche ; pour les autres, écrivez votre algorithme sur papier avant de coder.
- **Cherchez par vous-même** : le cours, la documentation JavaScript de MDN (<https://developer.mozilla.org/fr/docs/Web/JavaScript>), la documentation de Node.js (<https://nodejs.org/api/>). Notez vos recherches dans `docs/journal-recherche.md`. Une IA ou un site peuvent vous aider à comprendre : citez-les, et sachez expliquer chaque ligne gardée.
- **Un code que vous ne savez pas expliquer n'est pas un acquis** : en soutenance, ses points peuvent ne pas être comptés.
- **Les tests fournis ne vérifient pas tout.** Le formateur a des tests cachés (autres données, cas limites) et joue des scénarios dans votre menu. Lisez chaque règle, écrivez vos propres tests, n'écrivez jamais un résultat en dur.
- Ne modifiez pas `src/saisie.js`, `src/outils.js` ni les tests fournis. Dans `app.js`, respectez les textes et les numéros imposés par les fiches.
- Un commit par étape qui marche, avec un message qui dit ce que vous avez fait.

## Les données

```js
{ id: 'S04', parcelle: 'P2', texture: 'sableux', pH: 4.8, etatHumidite: 'sec' }
```

| Champ | Contenu |
| --- | --- |
| `id` | Identifiant unique du point observé, par exemple `S04` |
| `parcelle` | Par exemple `P2` |
| `texture` | `sableux`, `limoneux` ou `argileux` |
| `pH` | Un nombre de 0 à 14, **sans unité** |
| `etatHumidite` | `sec`, `intermédiaire` ou `humide` (humidité du sol) |

Textures et états d'humidité sont des **classes d'exercice**. Un pH **strictement inférieur à 5,5** est marqué « à discuter avec le coach » : c'est un repère pédagogique, pas un diagnostic, et le programme ne donne aucun conseil automatique. Pas de moyenne de pH : son échelle est logarithmique.

**Résultats de référence**, avec les données de départ :

- pH minimum **4,8**, maximum **7,6** ; **3** sableux, **4** limoneux, **3** argileux ;
- points à discuter : **S01, S04, S06, S09** ; un pH de 5,5 n'en fait pas partie ;
- `S04` : P2, sableux, pH 4,8, sec ; `S99` : introuvable ; le tri par pH commence par `S04` ;
- un pH de 14 est admis ; 14,1, -1 et une saisie vide sont refusés ; un état d'humidité hors des trois modalités est refusé ; sur un carnet vide, minimum et maximum affichent « aucune donnée ».

## À rendre

À l'heure de livraison, la dernière version poussée sur GitHub est évaluée :

- le code, avec tous les tests du socle au vert (seuls ceux du bonus peuvent rester rouges) ;
- `README.md` complété ;
- dans `docs/` : dictionnaire des données, tableau des tâches, relevé des tests, journal de recherche, fiche agronomique (une page), fiche individuelle.
