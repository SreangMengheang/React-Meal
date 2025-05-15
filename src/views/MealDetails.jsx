import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LoadingIndicator from '../components/LoadingIndicator';

export default function MealDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        setMeal(data.meals ? data.meals[0] : null);
        if (!data.meals) setError("Meal not found.");
      })
      .catch(() => setError("Failed to fetch meal details."))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <MainLayout>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : meal ? (
        <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-3xl font-bold mb-4">{meal.strMeal}</h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full rounded mb-4" />
          <p className="mb-2"><span className="font-semibold">Category:</span> {meal.strCategory}</p>
          <p className="mb-2"><span className="font-semibold">Area:</span> {meal.strArea}</p>
          <h3 className="text-xl font-bold mt-4 mb-2">Instructions</h3>
          <p className="mb-4">{meal.strInstructions}</p>
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Watch on YouTube
          </a>
        </div>
      ) : null}
    </MainLayout>
  );
}