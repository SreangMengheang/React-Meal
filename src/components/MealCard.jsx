import React from 'react'
import { Link } from 'react-router-dom'

const MealCard = ({ meal }) => {
  return (
    <div className="bg-gray-900 p-4">
      <div className="max-w-sm w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <Link
          to={`/meal/${meal.idMeal}`}
          className="block hover:scale-105 transition-transform"
          tabIndex={-1}
        >
          <img
            className="w-full h-56 object-cover"
            src={meal.strMealThumb}
            alt="meal"
          />
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2 text-white">{meal.strMeal}</h2>
            <p className="text-gray-300">...</p>
          </div>
        </Link>
        {meal.strYoutube && (
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block m-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={e => e.stopPropagation()}
          >
            Watch on YouTube
          </a>
        )}
      </div>
    </div>
  )
}

export default MealCard
