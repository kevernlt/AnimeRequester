# AnimeRequester

**Démo en ligne :** []()

## Description
Une application web de recherche d'animés développée en JavaScript. L'utilisateur peut rechercher un animé par titre ou par genre grâce à une API. Les résultats s'affichent sous forme de cartes avec le titre, l'image, le synopsis, les genres, le classement et le nombre d'épisodes.

## Technologies utilisées
* **HTML5** : Structure sémantique et accessibilité.
* **CSS3** : Mise en page responsive, thème clair / sombre.
* **JavaScript (ES6+)** : Requêtes `fetch`, manipulation dynamique du DOM, sans dépendance externe.
* **Tenrai API** : Catalogue d'animés issu de MyAnimeList ([https://api.tenrai.org/documentation](https://api.tenrai.org/documentation)).

## Fonctionnalités & Choix techniques
* **Recherche par titre ou par genre** :
  * La liste des genres est récupérée dynamiquement depuis l'API pour remplir le formulaire.
* **Pagination "Afficher plus"** :
  * Les résultats sont chargés par lots de 10.
  * Le bouton "Afficher plus" ajoute les 10 suivants à la suite des cartes déjà affichées, et disparaît quand il n'y a plus de résultats.
* **Theme Switcher** :
  * Changement de thème dynamique (mode clair / mode sombre).
  * Le choix est conservé pendant la session grâce au `sessionStorage`.

## Lancement en local

1. **Cloner le projet :**
   ```bash
   git clone https://github.com/kevernlt/AnimeRequester.git
   cd AnimeRequester
   ```

2. **Exécuter le site :**
* Ouvre le dossier avec Visual Studio Code et lance `index.html` avec l'extension **Live Server** (le script étant chargé en module, un simple double-clic peut être bloqué par certains navigateurs).
