# 1. Comprendre et préparer

**Objectif :** un poste prêt, un dépôt GitHub, le besoin compris, un plan de travail.

1. **Poste et dépôt.** Suivez « Démarrer » dans `SUJET.md`. Montrez au coach : `npm test` affiche 3 tests verts, le dépôt est sur GitHub.
2. **Le besoin.** Rédigez la partie « Contexte » du `README.md` : qui utilise l'outil, son besoin, ce qu'il saisit et ce qu'il veut voir. Distinguez le **constat** (ce qu'on observe ou mesure, sans l'interpréter) de l'**hypothèse** (une explication possible, à vérifier avec l'agronome). Le carnet enregistre des constats et repère des valeurs à discuter : il ne pose aucun diagnostic.
3. **L'agronomie.** Avec la fiche de terrain et le coach agronomie : comment reconnaît-on les trois textures (`sableux`, `limoneux`, `argileux`) ? Les trois états d'humidité sont des classes d'exercice. Le pH est sans unité ; l'échelle va de 0 à 14, les sols cultivés se situent à peu près entre 4 et 9 (0 ne sert qu'à tester le programme). Le seuil de 5,5 est un repère pédagogique. Gardez vos notes pour `docs/fiche-agronomique.md`.
4. **Les données.** Complétez `docs/dictionnaire-donnees.md`. Ouvrez `donnees/observations.json` et trouvez à la main le pH minimum et maximum, le nombre d'observations de chaque texture et les points de pH inférieur à 5,5 (dans `docs/releve-tests.md`).
5. **Le code fourni.** Lisez `src/saisie.js` (la saisie au clavier), `src/outils.js` et les tests de `test/`. `app.js` est presque vide : vous y écrirez tout le menu. Notez dans `docs/journal-recherche.md` les notions que vous devrez chercher.
6. **Le plan.** Remplissez la colonne « Prévu » de `docs/taches.md` : c'est vous qui organisez vos quatre jours.

**Une expérience pour lire un test rouge :** dans `src/outils.js`, remplacez `return NaN;` par `return 0;`, lancez `npm run test:outils`, lisez le message (`expected` = attendu, `actual` = obtenu), puis annulez avec `git restore src/outils.js`.
