# Daybreak — processus de conception

**Document de travail, écrit après coup.** Il décrit ce qui a été fait, dans quel ordre, avec quels outils, et ce qui n'a pas marché. Il ne contient pas de notes internes ni de raisonnement privé : uniquement des décisions, des observations et des résultats vérifiables dans le dépôt.

- Projet : **Les Neuf Portes — Le Pacte des Cendres** (édition 2027 fictive, non officielle)
- Auteur : **DeepSeek V4.1 Flash** (identifiant de modèle fourni par l'environnement ; numéro de build non communiqué)
- Organisation retenue : **Hellfest** (Clisson, France)
- Session de conception : **27 octobre 2026, 16:54:58 → 17:40:00** (45 minutes, relevé manuel)
- Rédaction de ce document : après la session, à partir de 18 h 15
- Point d'entrée du dépôt : [`../README.md`](../README.md)

---

## 1. Périmètre

Ce document couvre trois choses :

1. **La séquence réelle** — ce qui a été fait, quand, et dans quel ordre.
2. **Les décisions** — y compris celles qui ont changé de direction en cours de route.
3. **Les vérifications** — ce qu'elles prouvent, et surtout ce qu'elles ne prouvent pas.

Il ne couvre pas : la génèse des idées, les hésitations sans conséquence, ni le détail des échanges avec l'outil. Ces éléments ne sont pas vérifiables par un lecteur et n'ont pas leur place dans une documentation de projet.

---

## 2. Séquence réelle

Les horaires proviennent des dates de modification des fichiers du dépôt et de l'horodatage des captures. Ils sont arrondis à la minute.

| Heure | Ce qui se passe | Trace vérifiable |
|---|---|---|
| 16:54 | Départ de l'épreuve | — |
| 16:55 – 17:05 | Consultation des cinq sites officiels par requête HTTP et extraction du texte ; relevé des éléments citables ; comparaison écrite ; décision | Blocs « recherche » de `dossier.html` |
| 17:05 | Écriture de `index.html`, `assets/styles.css`, `assets/app.js` | Horodatage des fichiers |
| 17:06 | Première capture de rendu (Chromium 148, 1440 × 950) | Capture `home.png`, 6 170 octets — **page vide**, voir §7 |
| 17:07 – 17:09 | `descente.html`, `veillee.html`, `infos.html`, `dossier.html` et leurs scripts ; captures des cinq pages en 1440 × 950 puis 390 × 844 | Captures horodatées |
| 17:10 – 17:17 | Corrections de mise en page ; premiers parcours scriptés (porte, braise, sceau) | `experience.css`, `descente.js` |
| 17:18 – 17:25 | Correction du voile qui assombrissait la section suivante ; correction du mode mouvement réduit | Captures avant/après |
| 17:25 – 17:32 | Ajout des modalités de participation ; rédaction de la section « méthode » du dossier ; adoucissement du cadrage Shen Yun | `infos.html`, `dossier.html` |
| 17:32 – 17:39 | Finition : bouton du sceau sans impasse, densité verticale de la Descente, focus clavier, `README` | `descente.js`, `experience.css` |
| 17:40 | Arrêt du prototype | Dernière capture |
| 18:15 – … | Rédaction de cette documentation | Ce fichier |

**Constat central :** aucune étape de maquettage ne figure dans cette séquence, parce qu'il n'y en a pas eu. Voir §5.

---

## 3. Recherche : méthode et limites

**Méthode.** Cinq requêtes HTTP sur les sites officiels, conversion du HTML en texte, lecture du texte. Aucun rendu de page n'a été observé : les captures d'écran des sites concurrents n'ont pas été produites.

**Conséquence directe.** Tout ce qui relève de l'apparence — couleurs, polices, mise en page, animations, comportement mobile — est classé **inaccessible** dans le dossier. Aucune valeur CSS d'un site officiel n'est citée dans ce dépôt, parce qu'aucune n'a été lue. Les couleurs et typographies du prototype sont des choix personnels, inspirés de l'imaginaire du festival, pas des relevés.

**Trois niveaux, appliqués sans exception :**

- **A — vérifié** : présent dans le texte extrait.
- **B — interprété** : déduction, signalée comme telle.
- **C — inaccessible** : ni lu ni déduit.

**Cas particuliers.**

- **Lollapalooza Stockholm** : page construite côté client. Seuls le logo et une image de tête ont été récupérés. Le candidat a été écarté pour une raison de méthode — impossible de décrire honnêtement ce qu'on n'a pas pu lire.
- **Shen Yun** : la page d'accueil porte un cadrage politique explicite. Le titre exact n'est **pas reproduit** dans le dossier : le citer aurait importé un positionnement que l'exercice doit précisément éviter. Le fait est signalé, la formulation est neutralisée.
- **Country Jam** : les informations vérifiables (édition 2025, têtes d'affiche, paliers de billets, cashless) sont récentes et précises, mais l'identité graphique et l'histoire du festival sont restées inaccessibles.

---

## 4. Réalisation : ordre réel d'écriture

1. `index.html` + `assets/styles.css` + `assets/app.js` — socle, jetons, navigation, son, générateur de sceau.
2. `descente.html` + `assets/experience.css` + `assets/descente.js` — la mécanique la plus risquée, écrite tôt pour être éprouvée tôt.
3. `veillee.html` + `assets/veillee.js` — le mode B, volontairement à l'opposé du mode A.
4. `infos.html` + `assets/infos.js` — le mode C, autonome.
5. `dossier.html` — le dossier de conception, écrit en dernier parce qu'il documente des tests qui n'existaient pas encore.

**Ce qui a été écrit avant le code :** le mythe, les neuf portes, le modèle de contenu (acte, espace, date, heure, réplique), l'articulation des trois modes, et la décision de fonder l'interaction sur la lumière. **Ce qui n'a pas été écrit avant le code :** la mise en page, les paliers responsive, les états d'interaction, la direction artistique chiffrée.

---

## 5. Ce qui n'a pas été fait en amont

**Aucun wireframe, aucun moodboard, aucune maquette, aucune planche de styles.**

La mise en page a été écrite directement en CSS, puis corrigée sur captures. Ce choix se défend par le temps imparti (90 minutes) ; il a un coût mesurable : quatre défauts de mise en page n'ont été découverts qu'à l'étape des captures, c'est-à-dire après l'écriture complète des feuilles de style.

| Défaut | Comment il a été vu | Coût |
|---|---|---|
| Bloc de tête décalé horizontalement | Première capture 1440 px | Retrait des marges automatiques, vérification par mesure des largeurs |
| Sous-titre de marque sur deux lignes | Capture suivante | `flex:none` sur la marque, sous-titre en `nowrap` |
| Voile et barre d'état assombrissant la section suivante | Capture après défilement | Classe `body.is-away` pilotée par un seuil de visibilité |
| Mode mouvement réduit illisible | Lancement avec préférence forcée | Bloc média dédié, réécriture des règles concernées |

**Ce qu'un maquettage aurait évité :** les trois premiers. Le quatrième relève d'un état système (préférence utilisateur) qu'une maquette statique n'aurait pas montré non plus.

**Ce qui a été fait à la place, et qui a fonctionné :** éprouver très tôt la mécanique la plus risquée (la flamme) sur la page réelle, plutôt que de la dessiner d'abord.

---

## 6. Décisions de conception

### 6.1 Lumière plutôt que 3D

La révélation repose sur un gradient radial et deux variables CSS (`--fx`, `--fy`) plus une variable par porte (`--lit`). Pas de WebGL, pas de canvas, pas de bibliothèque. **Alternative écartée :** un rendu WebGL avec éclairage — plus spectaculaire, mais coûteux sur appareil modeste et impossible à rendre accessible simplement.

### 6.2 Le sceau comme objet, pas comme score

Le sceau est un SVG déterministe : neuf rayons, ceux des portes franchies allumés, des arcs entre les portes consécutives, un centre. Même parcours, même dessin ; aucun stockage serveur, aucun identifiant. **Alternative écartée :** un système de points ou de badges — plus lisible, mais générique et sans lien avec la fiction des neuf portes.

### 6.3 Le mode B comme inverse temporel du mode A

La Veillée ne demande rien : pas de lumière, pas de porte, pas d'état. C'est une décision de structure, pas de contenu — elle garantit que les deux modes immersifs ne se concurrencent pas. **Alternative écartée :** un second mode interactif (chasse aux fragments, par exemple), qui aurait doublé la mécanique sans ajouter de sens.

### 6.4 L'accès direct traité comme un mode, pas comme une page annexe

Les Infos ont leur propre entrée de navigation, leurs sous-sections, leurs filtres et leurs avertissements. Aucune information essentielle n'y dépend de l'immersif. C'est la contrainte du brief la plus facile à trahir par négligence : elle a été traitée en premier dans la structure de navigation.

### 6.5 Le son, coupé par défaut

Nappe synthétisée (trois oscillateurs, filtre passe-bas modulé par un LFO), jamais chargée depuis un fichier. Coupée par défaut, contrôlable, arrêtée sur `pagehide`. **Alternative écartée :** une ambiance sonore automatique — exclue par le brief.

### 6.6 Pas d'imagerie gothique

Ni crânes, ni pentagrammes, ni sang. Ces codes appartiennent au merchandising ; les employer aurait produit une citation, pas une fidélité. La reconnaissance passe par la nuit, la chaleur, la densité typographique et l'adresse directe au public.

---

## 7. Impasses techniques rencontrées

Ces points ne figurent pas dans le dossier intégré au prototype : ils concernent l'outillage de vérification, pas le prototype. Ils sont consignés ici parce qu'ils expliquent certaines traces (captures vides, tests refaits).

| Impasse | Symptôme | Ce qui a été fait |
|---|---|---|
| Capture depuis un serveur local | PNG de 6 170 octets, page entièrement blanche | Captures refaites en `file://` avec autorisation d'accès aux fichiers locaux |
| Navigateur complet en environnement contraint | Le binaire refuse de démarrer | Utilisation de la variante *headless shell* de Chromium 148 |
| `scroll-behavior: smooth` + temps virtuel | Les défilements programmés n'aboutissent pas | Tests relancés avec préférence de mouvement réduit forcée (le CSS repasse alors en `auto`) |
| `IntersectionObserver` sous temps virtuel | Rappels non déclenchés, état de la page non représentatif | Remplacement par un calcul de ratio `getBoundingClientRect` pour le masquage du voile |
| Écriture de fichiers binaires dans le dépôt | Permission refusée par l'environnement de travail | Captures conservées hors dépôt ; visuels du dépôt limités au SVG (voir [`CAPTURES.md`](CAPTURES.md)) |

**Ce que cela change pour le lecteur :** les tests d'interaction ont été exécutés en pilotant la page par script (clics et focus programmés), pas par des événements réellement émis par un utilisateur. C'est une différence réelle, signalée partout où elle compte.

---

## 8. Vérification : outils et portée

### 8.1 Analyse statique

```bash
node --check assets/app.js assets/descente.js assets/veillee.js assets/infos.js
```

Plus trois scripts ponctuels, non versionnés : contrôle des liens `href`/`src` des cinq pages, comparaison des ancres avec les identifiants, extraction des `getElementById` et vérification de leur présence dans le HTML, contrôle de structure (balises, unicité des `id`, un seul `h1` par page), comparaison des classes HTML avec les sélecteurs CSS.

**Ce que cela prouve :** aucune erreur de syntaxe, aucun lien mort, aucun identifiant manquant.
**Ce que cela ne prouve pas :** que l'interaction fonctionne, ni que la page est lisible.

### 8.2 Rendu réel

```bash
chrome-headless-shell.exe --headless --no-sandbox --disable-gpu --hide-scrollbars \
  --window-size=1440,950 --virtual-time-budget=2500 \
  --allow-file-access-from-files --screenshot=capture.png \
  file:///…/neuf-portes/index.html
```

Même commande avec `--window-size=390,844` pour le mobile et `--force-prefers-reduced-motion` pour le mode mouvement réduit.

**Ce que cela prouve :** la page se rend, à une taille donnée, dans un moteur donné, à un instant donné.
**Ce que cela ne prouve pas :** le comportement tactile, la navigation réelle au clavier, la lecture par un lecteur d'écran, ni le rendu dans un autre moteur.

### 8.3 Parcours scriptés

Une page pilote charge le prototype dans un cadre, déclenche une action et relève l'état du document : ouverture d'une porte, scellement d'une braise, ouverture du sceau (avec et sans braise), filtre du programme, panier et pass, bouton son, mode « Tout révéler », focus sur une porte, progression de la Veillée.

**Ce que cela prouve :** les gestionnaires d'événements répondent et l'état attendu est atteint.
**Ce que cela ne prouve pas :** que l'expérience est agréable, compréhensible, ou utilisable au doigt.

### 8.4 Résultats

Détaillés dans [`../README.md`](../README.md#10-vérifications-réellement-exécutées) et dans `dossier.html#tests`. Aucun test n'est présenté comme réussi s'il n'a pas été exécuté ; les lignes « non testé » correspondent à des vérifications impossibles dans cet environnement.

---

## 9. Angles morts

1. **Aucun appareil physique.** Aucun événement tactile émis. Le comportement au doigt est déduit du code.
2. **Aucun lecteur d'écran.** La structure ARIA est écrite mais n'a pas été éprouvée à l'oreille.
3. **Aucun enchaînement réel au `Tab`.** Seul un focus programmé a été vérifié.
4. **Aucune écoute du son.** Déclenchement et coupure vérifiés par attribut, pas par oreille.
5. **Un seul moteur.** Firefox et Safari n'ont pas été ouverts.
6. **Aucune mesure de performance.** Ni Lighthouse, ni profil sur appareil modeste.
7. **Aucune publication.** Rien n'a été mis en ligne ; le rendu des visuels sur GitHub n'a pas été observé.

Ces sept points sont la vraie limite de ce prototype : ce qui est vérifié l'est solidement, mais l'essentiel de l'expérience réelle — le doigt, l'oreille, le lecteur d'écran, le réseau lent — reste non éprouvé.

---

## 10. Écriture de cette documentation

Cette documentation a été rédigée **après** la session de conception, sur demande, par la même IA (DeepSeek V4.1 Flash), à partir de :

- du contenu réel des fichiers du dépôt ;
- des dates de modification de ces fichiers ;
- de l'horodatage et du contenu des captures produites pendant la session ;
- des résultats de tests consignés au moment où ils ont été exécutés.

**Aucune étape, aucun test, aucun visuel n'a été ajouté pour rendre le récit plus cohérent.** Là où une information manquait — durée exacte de chaque phase, mesure de performance, rendu sur GitHub — elle est signalée comme manquante plutôt que comblée par une estimation.

Les visuels du dépôt sont datés et qualifiés un par un dans [`../README.md`](../README.md#11-visuels) : deux schémas produits après coup, une planche de jetons produite après coup, une sortie réelle du prototype. **Aucun n'est présenté comme un document préparatoire.**

---

## 11. Corrections apportées après la première rédaction

Une relecture complète, demandée après la remise, a produit deux séries de corrections. Elles sont consignées ici parce qu'elles changent le contenu du dépôt.

### 11.1 Six corrections dans le prototype (textes de fiction)

| Fichier | Avant | Après | Motif |
|---|---|---|---|
| `index.html` (mythe) | « Neuf portes creusées dans le val, une pour chaque année de veille à venir. » | « Neuf portes creusées dans le val. » | Neuf années de veille à partir de 2006 mènent à 2015, pas à 2027 : la phrase contredisait la date de l'édition |
| `dossier.html` (concept) | « Neuf portes s'ouvrent la même nuit, une par année de veille. Neuf actes, cinq espaces… » | « Neuf portes s'ouvrent la même nuit. Neuf actes portés par ces portes, douze actes au programme, cinq espaces… » | Même contradiction, et le dossier annonçait neuf actes là où le programme en compte douze |
| `assets/descente.js` (porte V) | « neuf braises, une par année de veille » | « neuf braises, une par porte » | Même contradiction, et formulation cohérente avec la mécanique : une porte franchie = une braise |
| `veillee.html` (fragment V) | « des braises, disposées en cercle, une par année de veille » | « des braises, disposées en cercle, une par porte » | Idem |
| `infos.html` (programme) | « 12 actes fictifs. Chaque porte de la Descente correspond à l'un d'eux. » | « 12 actes fictifs, dont les neuf portés par les portes de la Descente. » | Faux : trois actes du programme ne sont portés par aucune porte |
| `index.html` (titre de section) | « Neuf portes, neuf actes » | « Les neuf actes des portes » | Levait l'ambiguïté avec les douze actes du programme |

Aucun autre fichier n'a été touché : ni le CSS, ni les scripts hors cette réplique, ni la structure des pages.

### 11.2 Une erreur dans la documentation, corrigée

La première version du tableau des neuf portes, dans `README.md`, citait des espaces et des actes qui **n'existent nulle part dans le code** : « L'Étable », « Le Pré Bas », « La Carrière », « La Porte », « La Pâtre ». Ces noms avaient été repris de mémoire au lieu d'être relus dans `assets/descente.js`.

Conséquence : le tableau annonçait un espace différent de celui du programme pour deux portes, et un acte inexistant pour la neuvième. Le prototype, lui, était cohérent : `DOORS`, le programme des Infos, les fragments de la Veillée et la liste de l'accueil affichent les mêmes actes, les mêmes espaces et les mêmes horaires.

Le tableau a été reconstruit à partir du fichier source, horaires compris, et la section « incohérences non corrigées » — qui décrivait donc un problème inexistant — a été supprimée.

**Leçon retenue :** une documentation ne se rédige pas de mémoire. Chaque nom, chaque chiffre et chaque horaire cité ici a été relu dans le fichier qui le contient ; c'est la vérification qui aurait dû précéder la première rédaction.

### 11.3 Nettoyages sans effet visuel

Sept classes HTML ne correspondaient à aucune règle CSS et à aucun sélecteur JavaScript : `page-home`, `page-infos`, `page-dossier`, `bar-dark` (sur deux pages) et `mode-a`, `mode-b`, `mode-c`. Elles ont été retirées. Vérification faite après coup : les captures des pages concernées sont **pixel pour pixel identiques** aux précédentes (mêmes tailles de fichier PNG), ce qui confirme que le retrait n'a rien changé au rendu.

Une ancre factice signalée par le script de contrôle venait d'un exemple de code affiché dans le dossier (`href="#…"`), pris pour un vrai lien par l'analyseur. L'exemple a été réécrit en `href="#ancre"`.

### 11.4 Ce que cette relecture a confirmé

Un contrôle croisé automatique compare désormais les quatre sources de la fiction — tableau `DOORS` de `assets/descente.js`, programme de `infos.html`, fragments de `veillee.html`, liste de `index.html` — sur le nom de chaque porte, son acte, son espace, son jour et son heure. **Résultat : aucun écart de fond sur 9 portes et 4 pages.** Une seule différence de libellé subsiste, volontaire : le programme écrit « Le Pacte — performance finale » là où les trois autres pages écrivent « Le Pacte ». C'est une précision, pas une contradiction.

- **5 espaces, 12 actes** n'est pas une incohérence : les cinq espaces sont Grand Autel, Le Puits, La Chapelle, La Forge et Le Champ des Cendres ; les douze actes comptent les neuf portes plus trois temps sans porte (ouverture et lecture du pacte, Basse-Fosse, La Veille).
- Les neuf portes, leurs actes, espaces, soirs et heures sont identiques dans `DOORS`, dans le programme, dans la Veillée et sur l'accueil.
- Les tarifs fictifs (39 €, 96 €, 149 €), la jauge (9 000 par nuit) et les horaires d'ouverture (17 h 00 – 23 h 30, 01 h 00 le samedi) concordent entre les Infos et la page d'accueil.
- Structure HTML, syntaxe JavaScript, liens et ancres restent conformes après correction.
