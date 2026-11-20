# Simple Drinks

Simple Drinks is a small React app for finding cocktail recipes. Browse the catalog, type a drink name, or open a recipe to see what goes in it, which glass to use, and how to make it.

[Try the live app](https://alexmoller02.github.io/React-Simple-Drinks/) · [Open the Margarita recipe](https://alexmoller02.github.io/React-Simple-Drinks/#/drinks/11007)

## Run it locally

Use Git and **Node.js 24** with the included npm. The GitHub Pages build uses the same Node version.

```bash
git clone https://github.com/alexmoller02/React-Simple-Drinks.git
cd React-Simple-Drinks
npm ci
npm start
```

Open [localhost:3000](http://localhost:3000). The browser fetches drink data directly from TheCocktailDB, so you'll need an internet connection. The app uses the API's public test key and needs no local API server or environment variables.

Run `npm run build` to create a production build in `build/`.

## How it works

1. **Browse.** The catalog loads drinks in TheCocktailDB's **Ordinary Drink** category and displays each name and photo in a responsive grid. The grid adds columns as more space becomes available.
2. **Search.** Type a name such as `margarita`. The app waits 300 ms after you stop typing, searches TheCocktailDB by name, and cancels requests for older queries. Clearing the field brings back the default catalog.
3. **Open a recipe.** Select a drink card to open `/#/drinks/<id>`. The recipe page takes the ID from the URL and fetches the drink's ingredients, measurements, glass type, and instructions. On wider screens the photo sits beside the recipe. On phones it sits above it.

### Where the code lives

| File | What it handles |
| --- | --- |
| [`src/App.js`](src/App.js) | Routes between the catalog and recipe pages. React Router's `HashRouter` keeps recipe links working on refresh on GitHub Pages. |
| [`src/Pages/Drinks/Drinks.jsx`](src/Pages/Drinks/Drinks.jsx) | Loads the catalog, manages the Material UI search field, and renders the drink grid. |
| [`src/Components/DrinkCard/DrinkCard.jsx`](src/Components/DrinkCard/DrinkCard.jsx) | Reuses the same card layout for each drink and opens its recipe when selected. |
| [`src/Pages/Drinks/DrinkPage.jsx`](src/Pages/Drinks/DrinkPage.jsx) | Looks up the drink by ID and renders the recipe. |
| [`src/Contexts/APIContext.js`](src/Contexts/APIContext.js) | Keeps Axios requests in one place and exposes them to both pages through `useAPI()`. |

The catalog uses `filter.php?c=Ordinary_Drink` for browsing and `search.php?s=margarita` for name searches. The recipe page uses `lookup.php?i=11007` to fetch a specific drink. Photos and recipe data come from [TheCocktailDB](https://www.thecocktaildb.com/).

## Deployment

The [GitHub Actions workflow](.github/workflows/deploy.yml) builds the app and publishes it to GitHub Pages on pushes to `master`.
