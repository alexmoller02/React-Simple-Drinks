import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAPI } from '../../Contexts/APIContext';
import './drink-page.css';

const DrinkPage = () => {
  const { id } = useParams();
  const { getDrink } = useAPI();
  const [result, setResult] = useState({ id: null, drink: null, error: '' });

  useEffect(() => {
    let active = true;

    async function loadDrink() { //Fetch drink from id
      try {
        const drink = await getDrink(id);
        if (active) setResult({ id, drink, error: '' });
      } catch (error) {
        if (active) {
          setResult({ id, drink: null, error: 'Unable to load drink. Please try again later.' });
        }
      }
    }

    loadDrink();
    return () => {
      active = false;
    };
  }, [id, getDrink]);

  const { drink, error } = result;
  const loading = result.id !== id;
  const ingredients = drink
    ? Array.from({ length: 15 }, (_, index) => {
        const number = index + 1;
        return {
          name: drink[`strIngredient${number}`],
          measure: drink[`strMeasure${number}`],
        };
      }).filter(({ name }) => name && name.trim())
    : [];

  return (
    <main className="drink-page">
      <Link className="drink-page-back" to="/">← Back to drinks</Link>
      {loading ? <p className="drink-page-status" role="status">Loading drink...</p> : error ? (
        <p className="drink-page-status" role="alert">{error}</p>
      ) : drink ? (
        <article className="drink-detail">
          <img className="drink-detail-image" src={drink.strDrinkThumb} alt={drink.strDrink} />
          <div className="drink-detail-content">
          <p className="drink-detail-label">Cocktail recipe</p>
          <h1>{drink.strDrink}</h1>
          <dl className="drink-detail-facts">
            <div><dt>Category</dt>
            <dd>{drink.strCategory}</dd></div>
            <div><dt>Alcohol</dt>
            <dd>{drink.strAlcoholic}</dd></div>
            <div><dt>Glass</dt>
            <dd>{drink.strGlass}</dd></div>
          </dl>
          <section aria-labelledby="ingredients-heading">
          <h2 id="ingredients-heading">Ingredients</h2>
          <ul className="drink-detail-ingredients">
            {ingredients.map(({ name, measure }, index) => (
              <li key={index}>{[measure?.trim(), name.trim()].filter(Boolean).join(' ')}</li>
            ))}
          </ul>
          </section>
          <section className="drink-detail-instructions" aria-labelledby="instructions-heading">
          <h2 id="instructions-heading">Instructions</h2>
          <p>{drink.strInstructions}</p>
          </section>
          </div>
        </article>
      ) : <p className="drink-page-status">Drink not found.</p>}
    </main>
  );
};

export default DrinkPage;
