import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LoadingIndicator from '../components/LoadingIndicator';
import MealCard from '../components/MealCard';

export default function MealsByIngredient() {
  const { ingredient } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then(res => res.json())
      .then(data => {
        setMeals(data.meals || []);
        if (!data.meals) setError("No meals found for this ingredient.");
      })
      .catch(() => setError("Failed to fetch meals."))
      .finally(() => setLoading(false));
  }, [ingredient]);

  return (
    <MainLayout>
      <h2 className="text-2xl font-bold mb-4 text-white mt-4">
        Meals with "{ingredient}"
      </h2>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {meals.map(meal => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </MainLayout>
  );
}