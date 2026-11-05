# Carnet d'observation des sols

> Projet individuel du SAS DFS, brief 3 (sujet : [SUJET.md](SUJET.md)). Remplacez chaque ✏️ par votre texte, puis supprimez cette ligne.

## Contexte

Le carnet d'observation des sol est destiné à l'équipe de technicien agronome de la ferme pédagogique , qui rélève des point de sol sur le terrain. Son geste professionnel consiste à observer un point  avec la fiche de terrain, puis à noter sa texture, son pH et son état d'humidité. Son besoin de conserver ces relevés, de retrouver rapidement les points concernés et de repérer les valeurs à vérifier avec l'agronome.L'utilisateur saisit un identifiant de point, une classe de texture une valeur croissant si besoin, et un état d'humidité. Le programme affiche la liste des observations, triées par pH croissant si besoin, et peut se limiter à une selection de point. Il signale aussi les saisies refusées et permet de corriger un champ d'une observation existante. En revanche, l'outil ne produit aucun diagnostic de fertilisation et ne remplace pas l'avis de l'agronome. Il aide seulement à organiser les relevés et à préparer la discution.


## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-3-carnet-sols.git
cd brief-3-carnet-sols
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [x] Données lues et enregistrées dans `donnees/observations.json`
- [x] Ajouter une observation, saisies invalides refusées sans arrêter le programme
- [x] Lister les observations, message si le carnet est vide
- [x] Rechercher par point ou par parcelle ; filtrer par texture
- [x] Trier par pH
- [x] Synthèse : pH minimum et maximum, nombre par texture, points à discuter (pH < 5,5)
- [x] Bonus : supprimer et modifier une observation (choix 6 et 7)
- [ ] Bonus : tri par pH décroissant, texture la plus fréquente

## Données

| Champ | Contenu | Exemple |
|---|---|---|
| `id` | Identifiant du point observé | `S11` |
| `parcelle` | Parcelle où se trouve le point | `P1` |
| `texture` | Classe de texture : TEXTURES | limoneux |
| `pH` | Nombre de 0 à 14, sans unité (virgule acceptée à la saisie) | `6,5` |
| `etatHumidite` | État d'humidité : HUMIDITES | sec |


## Limites

Pas de diagnostic : le carnet repère des valeurs à discuter, mais ne produit aucun diagnostic de fertilisation et ne remplace pas l'avis de l'agronome.
-Pas de moyenne de pH: le pH suit une échelle logarithmique, donc la synthèse donne seulement le minimum et le maximum.
-Seuil fixe*: les « points à discuter » sont ceux dont le pH est strictement inférieur à 5,5. Ce seuil est le même pour tous les sols et toutes les cultures, alors qu'il peut varier selon le contexte.
-Données fictives et peu nombreuses : les observations ne permettent aucune conclusion sur un vrai terrain.
-Stockage simple : un seul fichier JSON, pour un seul utilisateur à la fois, sans sauvegarde automatique ni historique des modifications.
-Saisie non vérifiée sur le terrain** : le programme contrôle le format (pH entre 0 et 14, texture et humidité dans les listes autorisées), mais ne peut pas savoir si la mesure est juste.



## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

Kouassi kouakou philippe alexandre , kouassiphilippe50 
aide : N'DIAMON jules christ et TOURE emmanuel 
sur : app.js , bonus et releves test.
