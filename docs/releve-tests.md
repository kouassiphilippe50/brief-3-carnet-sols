# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** : refaites à la main les résultats de référence de `SUJET.md`, puis comparez avec votre programme. 
 - Nombres d'observations : 10 observations
 - pH minimum = 4.8 ---> S04
 - pH maximum = 7.6 ---> S08
 - Nombre de texture: sableux (3) ---> S01, S04, S08.
                      limoneux (4) ---> S02, S05, S07, S10.
                      argileux (3) ---> S03, S06, S09.

S04 : P2, sableux, pH 4,8, sec;
S99 : introuvable

**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action         | Attendu | Obtenu | Testeur |
| -------------- | ------- | ------ | ------- |
| Rechercher     |recherche un champs | | |
| un ajout valid |Observation ajoutéé au tableau reussie | | |
|  la synthèse   |afficher des statistiques | | |
|chaque tri      | trioé avec succès| | |
|                | | | |
| erreur         | le message | | |

**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : ✏️

 pH minimum **4,8**, maximum **7,6** ; **3** sableux, **4** limoneux, **3** argileux ;
- points à discuter : **S01, S04, S06, S09** ; un pH de 5,5 n'en fait pas partie ;
- `S04` : P2, sableux, pH 4,8, sec ; `S99` : introuvable ; le tri par pH commence par `S04` ;
- un pH de 14 est admis ; 14,1, -1 et une saisie vide sont refusés ; un état d'humidité hors des trois modalités est refusé ; sur un carnet vide, minimum et maximum affichent « aucune donnée ».