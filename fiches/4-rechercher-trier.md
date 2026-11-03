# 4. Rechercher et trier

**Vos fichiers :** `src/recherche.js`, puis `app.js` (choix 3 et 4) · **Vos tests :** `npm run test:recherche` (5 tests fournis)

## 1. `filtrerParParcelle(observations, parcelle)` et 2. `filtrerParTexture(observations, texture)`

Renvoient un **nouveau** tableau, dans l'ordre du carnet, éventuellement vide. `filtrerParParcelle(donnees, 'P2')` donne S03, S04 ; `filtrerParTexture(donnees, 'limoneux')` donne S02, S05, S07, S10.

**À vous.** Pistes : partez d'un tableau vide ; comment ajoute-t-on un élément à la fin d'un tableau ? Une méthode des tableaux fait ce travail en une ligne : utilisez-la seulement si vous savez l'expliquer.

## 3. `trierParPh(observations)`

Renvoie une **copie** triée par pH croissant ; deux pH égaux gardent leur ordre ; le carnet reçu ne change pas. Le tri commence par S04 (4.8) et finit par S08 (7.6).

**À vous.** Le brief impose un **comparateur numérique** : cherchez dans la documentation de `sort` ce qu'est une fonction de comparaison. Essayez dans un terminal `node` : `[10, 9.5, 5.2].sort()`.

## 4. Le menu : choix 3 et 4 (`app.js`)

Dialogue **imposé** :

```text
--- Rechercher ---
1. Par point (identifiant)
2. Par parcelle
3. Les observations d'une texture
Votre choix : 1
Point : s04
S04 | P2 | sableux | pH 4.8 | sec
```

| Sous-choix | Question | Affichage |
| --- | --- | --- |
| `1` | `Point : ` (en majuscules) | la ligne, ou `Observation S99 introuvable.` |
| `2` | `Parcelle : ` (en majuscules) | `2 observation(s) sur la parcelle P3 :` puis la liste |
| `3` | `Texture : ` (en minuscules) | `3 observation(s) de texture argileux :` puis la liste |
| autre | — | `Choix inconnu : retour au menu.` |

```text
--- Trier ---
1. Par pH croissant
Votre choix : 1
S04 | P2 | sableux | pH 4.8 | sec
…
```

La liste triée s'affiche juste après le choix, sans titre ; autre sous-choix : `Choix inconnu : retour au menu.` Les listes sont le texte de `listerObservations`.

## Vérifier

`npm run test:recherche`, puis dans le menu : `S04`, `S99`, `P3`, `argileux`, le tri. Après un tri, la liste (choix 2) doit être revenue dans l'ordre d'origine.
