# cDexEndMC

Bot Discord développé en JavaScript (ES10+) avec discord.js v14, permettant d’afficher des informations détaillées sur les Pokémon via l’API officielle [PokéAPI](https://pokeapi.co/).

---

## Fonctionnalités

- Commande slash `/pokedex <pokemon>/<id>` pour rechercher un Pokémon par son nom.
- Affichage paginé via boutons pour naviguer entre :
  - Informations de base (types, taille, poids, expérience)
  - Statistiques (avec barres de progression textuelles)
  - Capacités (avec indication des capacités cachées)
- Gestion des erreurs utilisateur (Pokémon non trouvé, erreurs réseau).

---

## Choix techniques et architecture

### Langage et librairies

- **JavaScript ES10+** : syntaxe moderne, maintenable et performante.
- **discord.js v14** : dernière version stable, support natif des slash commands et interactions.
- **node-fetch** : pour effectuer les requêtes HTTP manuellement, sans wrapper.

### Architecture modulaire

Le projet est organisé en dossiers fonctionnels pour une meilleure lisibilité et maintenabilité :

- `commands/` : définition et gestion des commandes Discord.
- `services/` : appels externes à l’API PokéAPI.
- `embeds/` : construction des messages enrichis (embeds) pour Discord.
- `utils/` : fonctions utilitaires réutilisables (ex : barre de progression).
- `config.js` : centralisation des variables sensibles et de configuration.
- `index.js` : point d’entrée principal, initialisation du client et gestion des événements.

Cette séparation claire permet d’isoler les responsabilités, facilitant les tests, la maintenance et les évolutions futures.

### Qualité du code

- Code documenté avec JSDoc pour chaque fonction, facilitant la compréhension.
- Gestion robuste des erreurs avec messages clairs pour l’utilisateur.
- Respect des bonnes pratiques backend : modularité, clarté, simplicité.

