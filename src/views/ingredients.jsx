import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout'
import LoadingIndicator from '../components/LoadingIndicator';

export default function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .then(res => res.json())
      .then(data => {
        setIngredients(data.meals || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch ingredients.");
        setLoading(false);
      });
  }, []);

  return (
    <MainLayout>
      <h2 className="text-2xl font-bold mb-4 text-white mt-4">Ingredients</h2>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ingredients.map(ingredient => (
              <Link
                key={ingredient.idIngredient}
                to={`/ingredients/${encodeURIComponent(ingredient.strIngredient)}`}
                className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center hover:bg-gray-700 transition"
              >
                <img
                  src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}
                  alt={ingredient.strIngredient}
                  className="w-20 h-20 object-contain mb-2"
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <h3 className="text-lg font-semibold text-white mb-1">{ingredient.strIngredient}</h3>
                <p className="text-gray-300 text-sm text-center">{ingredient.strDescription ? ingredient.strDescription.slice(0, 80) + '...' : 'No description.'}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </MainLayout>
  )
}
