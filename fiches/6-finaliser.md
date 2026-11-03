# 6. Tester, documenter, livrer

**Objectif :** un programme vérifié par quelqu'un d'autre, des livrables complets, une version poussée avant l'heure de livraison.

## Tester

1. `npm test` : tous les tests du socle sont verts (seuls ceux du bonus peuvent rester rouges).
2. **Faites tester par un camarade**, qui suit votre `docs/releve-tests.md` et essaie de casser le programme : pH négatif, vide, avec des lettres ou du texte (`pH 7`), avec une virgule ; les bornes `0`, `14`, `14,1` ; point en double, en minuscules ; texture ou état d'humidité hors liste ; plusieurs erreurs à la fois ; choix inconnu ; Entrée sans rien taper ; une observation de pH `5,5` puis la synthèse. Corrigez, retestez, gardez la trace.
3. **Écrivez vos propres tests** dans les fichiers `test/*.test.js` pour les cas limites (au moins quatre donnent un bonus).

## Documenter

- `docs/fiche-agronomique.md`, relue par le coach agronomie.
- `README.md` : cochez seulement ce qui marche.
- Vérifiez chaque document de `docs/` (voir « À rendre » dans `SUJET.md`).

## Livrer

Vérifiez sur un autre poste, en suivant votre README, à côté de votre projet et pas dedans :

```powershell
cd ..
git clone https://github.com/VOTRE-COMPTE/brief-3-carnet-sols.git test-livraison
cd test-livraison
node app.js
npm test
```

Supprimez ensuite `test-livraison`. Avant l'heure : `git status` propre, `git push` fait.

## La soutenance (environ 15 minutes, individuelle)

1. **Démonstration (3 min)** : liste ; recherche de `S04` puis `S99` ; tri par pH ; synthèse ; une observation saisie en direct puis la synthèse à nouveau ; une saisie refusée (pH `14,1`).
2. **Explication (4 min)** : une fonction choisie par le jury, ligne par ligne.
3. **Modification guidée (4 min)**, par exemple : compter par état d'humidité, marquer aussi les pH supérieurs à 7,5, filtrer par état d'humidité, compter les parcelles différentes.
4. **Questions (3 min)** : votre poste et Git (`git add`, `git commit`, `git push`) ; votre raisonnement (entrées, sortie, carnet vide, seuil strict) ; vos recherches (journal) ; l'agronomie (constat ou hypothèse, pas de moyenne de pH, un point à discuter n'est pas un diagnostic, un lien entre texture et eau).
