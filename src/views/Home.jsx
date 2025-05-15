import React from 'react'
import { useState, useEffect } from "react";
import MealCard from "../components/MealCard";
import MainLayout from "../layouts/MainLayout";
import SearchForm from "../components/SearchForm";
import LoadingIndicator from "../components/LoadingIndicator";

export default function Home() {

    const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState("");
  const [heading, setHeading] = useState('Random Meals');
  const [loading, setLoading] = useState(false); // <-- add loading state

  const fetchRandomMeals = async () => {
    setError("");
    setLoading(true); // <-- start loading
    try {
      const mealPromises = Array.from({ length: 6 }, () =>
        fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(res => res.json())
      );
      const results = await Promise.all(mealPromises);
      const randomMeals = results.map(result => result.meals[0]);
      setMeals(randomMeals);
    } catch (error) {
      setError("Error fetching random meals. Please try again.");
      console.error("Error fetching random meals:", error);
    } finally {
      setLoading(false); // <-- stop loading
    }
  };

  useEffect(() => {
    fetchRandomMeals();
  }, []);

  const handleSearch = (query) => {
    setError("");
    setLoading(true);
    console.log("Searching for:", query);
    if (!query) {
      setHeading('Random Meals');
      fetchRandomMeals();
      return;
    }

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setHeading(`Search Results for "${query}"`);
        setMeals(data.meals || []);
        if (!data.meals) {
          setError("No meals found for your search.");
        }
      })
      .catch(error => {
        setError("Error fetching meals. Please try again.");
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false); // <-- stop loading
      });
  };


  return (
    <MainLayout>
      <div className="flex justify-center items-center my-4">
        <SearchForm search={search} setSearch={setSearch} handleSearch={handleSearch} />
      </div>
      <h2 className="text-2xl font-bold mb-4 text-white">{heading}</h2>
      {error && (
        <p className="text-center text-red-500 mb-4">{error}</p>
      )}
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {meals.length === 0 && !error && <p className="text-center text-white">No meals found</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {meals.map(meal => (
              <MealCard
                key={meal.idMeal}
                meal={meal}
              />
            ))}
          </div>
        </>
      )}
    </MainLayout>
  )
}
