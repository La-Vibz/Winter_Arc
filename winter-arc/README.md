# Winter Arc 2026 : mise en ligne

Ce dossier contient la web app complète. Une fois en ligne, tes potes l'installent sur leur téléphone avec la vraie icône, et chacun a son compte. Aucune ligne de code à écrire : il faut juste créer deux comptes gratuits et copier-coller deux valeurs. Compte 30 à 45 minutes.

Contenu du dossier : `index.html` (l'app), `config.js` (les deux valeurs à remplir), `supabase.sql` (la base de données), `manifest.webmanifest` et `sw.js` (ce qui rend l'app installable), et le dossier `icons`.

## Étape 1 : la base de données sur Supabase

Supabase stocke les profils, les persos, les cases cochées et fait tourner les duels.

1. Va sur supabase.com, crée un compte (connexion avec GitHub possible), puis clique sur **New project**. Donne-lui le nom `winter-arc`, choisis un mot de passe de base de données (garde-le quelque part, tu n'en auras pas besoin ensuite) et la région **Paris (eu-west-3)**. Attends une minute que le projet se crée.
2. Dans le menu de gauche, ouvre **SQL Editor**, colle tout le contenu du fichier `supabase.sql`, puis clique sur **Run**. Tu dois voir « Success ».
3. Ouvre **Authentication**, puis **Sign In / Providers**, puis **Email**. Désactive **Confirm email** et enregistre. Tes potes pourront créer leur compte sans attendre de mail de confirmation (les mails gratuits de Supabase sont limités à quelques-uns par heure, ça bloquerait les inscriptions).
4. Ouvre **Project Settings**, puis **API Keys** (ou **Data API** selon la version de l'interface). Copie le **Project URL** et la **Publishable key** (si tu ne vois que des clés « legacy », prends la clé **anon public**). Ne copie jamais la clé *secret* ou *service_role*.
5. Ouvre `config.js` avec un éditeur de texte (Bloc-notes, TextEdit en mode texte brut) et remplace les deux valeurs `COLLE_ICI…` par ce que tu viens de copier, en gardant les guillemets.

## Étape 2 : l'hébergement sur GitHub Pages

1. Crée un compte sur github.com si tu n'en as pas.
2. Clique sur **+** en haut à droite, puis **New repository**. Nom : `winter-arc`, visibilité **Public** (obligatoire pour GitHub Pages gratuit), puis **Create repository**.
3. Sur la page du dépôt, clique sur **uploading an existing file**. Glisse-dépose **le contenu** du dossier (tous les fichiers et le dossier `icons`, pas le dossier parent), puis **Commit changes**.
4. Va dans **Settings**, puis **Pages**. Dans **Source**, choisis **Deploy from a branch**, branche **main**, dossier **/ (root)**, puis **Save**.
5. Après une à deux minutes, ton site est en ligne à l'adresse `https://TON-PSEUDO-GITHUB.github.io/winter-arc/`. C'est le lien à envoyer à tes potes.

## Étape 3 : installer l'app sur le téléphone

Sur iPhone, ouvre le lien dans **Safari**, touche **Partager**, puis **Sur l'écran d'accueil**. Sur Android, ouvre le lien dans **Chrome**, touche le menu **⋮**, puis **Installer l'application** ou **Ajouter à l'écran d'accueil**. L'app s'ouvre alors en plein écran avec son icône.

Chacun crée son compte avec son e-mail et un mot de passe, puis son perso. Les duels commencent le lendemain de l'inscription.

## Bon à savoir

Pour modifier l'app plus tard, remplace simplement `index.html` dans le dépôt GitHub (bouton **Add file**, puis **Upload files**). Le site se met à jour en une à deux minutes.

Toute personne qui a le lien peut créer un compte. Ne le poste pas publiquement si tu veux garder le challenge entre potes.

Comme la confirmation par e-mail est désactivée, il n'y a pas de « mot de passe oublié ». Si quelqu'un perd le sien, supprime son utilisateur dans Supabase (**Authentication**, puis **Users**) et il recrée un compte : son perso repart de zéro.

Le projet gratuit Supabase se met en pause après une semaine sans aucune activité. Tant que vous vous connectez tous les jours, ça n'arrivera pas.

La clé que tu mets dans `config.js` est faite pour être publique : ce sont les règles du fichier `supabase.sql` qui protègent les données. Chacun peut voir le classement, mais personne ne peut modifier le profil d'un autre.
