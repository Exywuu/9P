# Captures du prototype — inventaire et reproduction

Ce document existe pour une raison précise : **les captures d'écran du prototype ne sont pas versionnées dans ce dépôt.**

L'environnement de travail de cette session n'autorisait l'écriture que de fichiers texte dans le dépôt (les copies de fichiers binaires y étaient refusées par permission). Les captures ont donc été produites, vérifiées et conservées **hors du dépôt**, dans le dossier temporaire de la session. Les visuels présents dans `docs/img/` sont, eux, du SVG — donc du texte.

Rien de ce qui suit n'est une reconstitution : les fichiers listés ont réellement été produits par le prototype, aux horodatages indiqués.

---

## 1. Inventaire des captures produites

Toutes les captures ont été faites avec **Chromium 148 *headless***, sur le prototype servi en `file://`.
Deux formats : **1440 × 950** (ordinateur) et **390 × 844** (mobile simulé par réduction du viewport).

| # | Fichier local | Ce qu'il montre | Format | Prise à |
|---|---|---|---|---|
| 01 | `z-index.png` | Accueil : bandeau de non-officialité, titre, arches, deux boutons | 1440 × 950 | 17:33 |
| 02 | `final-d3.png` | Descente : flamme posée sur la porte II, porte illuminée, les huit autres en retrait | 1440 × 950 | 17:39 |
| 03 | `t-panel.png` | Panneau de la porte V (Braise) : acte, espace, date, réplique, deux actions | 1440 × 950 | 17:13 |
| 04 | `t-gate.png` | Panneau du sceau après une braise : dessin généré, mention « 1 braise · porte III » | 1440 × 950 | 17:13 |
| 05 | `t-reveal.png` | Mode « Tout révéler » : les neuf portes lisibles, libellé du bouton inversé | 1440 × 950 | 17:13 |
| 06 | `z-veillee.png` | Veillée : en-tête, bouton de nappe sonore, premier fragment | 1440 × 950 | 17:33 |
| 07 | `z-infos.png` | Infos : en-tête, sept sous-sections, grille « En bref » avec mentions FICTIF | 1440 × 950 | 17:33 |
| 08 | `z-dossier.png` | Dossier : sommaire, bloc « ce que j'ai réellement fait / ce que je n'ai pas pu faire » | 1440 × 950 | 17:33 |
| 09 | `t-focus.png` | Focus clavier programmé sur la porte I : contour visible, flamme déplacée | 1440 × 950 | 17:34 |
| 10 | `t-ticket.png` | Pass de démonstration : titre, dates, montant fictif, mention « NON VALABLE », sceau | 1200 × 420 | 17:17 |
| 11 | `zm-index.png` | Accueil en 390 px : bandeau, titre sur deux lignes, boutons pleine largeur | 390 × 844 | 17:33 |
| 12 | `final-dm.png` | Descente en 390 px : portes lisibles sans interaction, barre d'état compacte | 390 × 844 | 17:37 |
| 13 | `zm-infos.png` | Infos en 390 px : sous-sections sur deux lignes, grille empilée | 390 × 844 | 17:33 |

D'autres captures ont été produites pendant la session (Veillée et Dossier en mobile, états intermédiaires, essais ratés). Elles n'ont pas d'intérêt documentaire : plusieurs sont des pages vides dues à un problème de capture, décrit dans [`PROCESS.md`](PROCESS.md) §7.

**Réserve sur la capture 09 :** un artefact de l'outil de capture apparaît en haut à gauche de l'image, au-dessus du bandeau. Elle prouve le focus, mais devrait être recadrée avant tout usage public.

---

## 2. Compléter la galerie du dépôt

Les fichiers ci-dessus se trouvent dans `%TEMP%\np` sur la machine où la session a eu lieu. Ce dossier temporaire peut être purgé par le système à tout moment : si les fichiers ont disparu, il faut les régénérer (§3).

Depuis la racine du projet, dans PowerShell :

```powershell
$src = Join-Path $env:TEMP 'np'
$dst = Join-Path (Get-Location) 'docs\img'

$map = [ordered]@{
  'z-index.png'  = '01-accueil-1440.png'
  'final-d3.png' = '02-descente-flamme-1440.png'
  't-panel.png'  = '03-panneau-porte-1440.png'
  't-gate.png'   = '04-sceau-1440.png'
  't-reveal.png' = '05-tout-reveler-1440.png'
  'z-veillee.png'= '06-veillee-1440.png'
  'z-infos.png'  = '07-infos-1440.png'
  'z-dossier.png'= '08-dossier-1440.png'
  't-focus.png'  = '09-focus-clavier-1440.png'
  't-ticket.png' = '10-pass-1200.png'
  'zm-index.png' = '11-accueil-390.png'
  'final-dm.png' = '12-descente-390.png'
  'zm-infos.png' = '13-infos-390.png'
}

foreach ($k in $map.Keys) {
  Copy-Item (Join-Path $src $k) (Join-Path $dst $map[$k]) -Force
}
```

Les images seront alors dans `docs/img/` et pourront être référencées en chemin relatif depuis le `README.md` :

```markdown
![Accueil du prototype](docs/img/01-accueil-1440.png)
```

---

## 3. Reproduire les captures

Les commandes ci-dessous sont celles réellement utilisées. Adapter le chemin du binaire Chromium et celui du projet.

**Ordinateur, 1440 × 950 :**

```bash
chrome-headless-shell --headless --no-sandbox --disable-gpu --hide-scrollbars \
  --window-size=1440,950 --virtual-time-budget=2500 \
  --allow-file-access-from-files --screenshot=01-accueil-1440.png \
  file:///…/neuf-portes/index.html
```

**Mobile, 390 × 844 :**

```bash
chrome-headless-shell --headless --no-sandbox --disable-gpu --hide-scrollbars \
  --window-size=390,844 --virtual-time-budget=2500 \
  --allow-file-access-from-files --screenshot=11-accueil-390.png \
  file:///…/neuf-portes/index.html
```

**Mode mouvement réduit** — ajouter `--force-prefers-reduced-motion` à la même commande.

**États d'interaction** (panneau, sceau, mode « Tout révéler », focus, pass) : ces captures ne s'obtiennent pas par une simple URL. Il faut une page pilote qui charge le prototype dans un cadre, déclenche l'action, puis capture l'ensemble. La page pilote utilisée pendant la session n'est pas versionnée : elle relevait de l'outillage de vérification, pas du prototype.

**Deux pièges rencontrés, à connaître :**

- Capturer depuis `http://127.0.0.1` produisait des images vides dans cet environnement ; les captures ont été faites en `file://` avec `--allow-file-access-from-files`.
- `scroll-behavior: smooth` empêche les défilements programmés d'aboutir sous temps virtuel : ajouter `--force-prefers-reduced-motion` (le CSS repasse alors en `auto`) ou forcer `scrollBehavior = 'auto'` dans la page pilote.

---

## 4. Ce qui n'existe pas

- **Aucune maquette, aucun wireframe, aucun moodboard, aucune planche de styles** : la conception s'est faite directement dans le navigateur (voir [`PROCESS.md`](PROCESS.md) §5).
- **Aucun avant/après de conception** : il n'y a pas d'état antérieur à comparer au résultat.
- **Aucune capture des sites officiels** : la recherche s'est faite par extraction de texte uniquement, sans rendu de page.
