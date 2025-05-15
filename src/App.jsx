import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Ingredients from "./views/ingredients";
import MealsByIngredient from "./views/MealsByIngredient";
import MealDetails from "./views/MealDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ingredients" element={<Ingredients />} />
      <Route path="/ingredients/:ingredient" element={<MealsByIngredient />} />
      <Route path="/meal/:id" element={<MealDetails />} />
    </Routes>
  )
}

export default App