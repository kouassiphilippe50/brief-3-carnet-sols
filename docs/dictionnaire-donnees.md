# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ         | Signification                     | Type   | Règle de validation          | Unité | Exemple |
| --------------| ----------------------------------| -----  | ---------------------------- | ----- | --- |
| `id`          | Identifiant unique                | texte  | non vide, absent des données |aucune | S02 |
| `parcelle`    |référence de la parcelle observée  | texte  |pas etre vide                 |aucune |P2 |
| `texture`     |texture du sol observée            | liste  |argileux - limoneux - sableux |aucune |sableux |
| `pH`          |mesure de l'acidité du sol observé | nombre |compris entre 0 et 14         |aucune |6 |
| `etatHumidite`|humidité du sol                    | texte  |sec, humide, intermediaire    |aucune |humide |

**Listes de valeurs autorisées** : 
TEXTURE (texture du sol) : Sablleux, argileux, limoneux
humide (etatHumide) : sec, humidité, intermediaire
PARCELLE : P1, P2, P3, P4, P5
**Sources** : le dictionnaire de notre fiche ( sol et capteurs de sol) && le fichier observation.Json.
