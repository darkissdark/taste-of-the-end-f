"use client";
import { useEffect, useState } from "react";
import css from "./AddRecipeForm.module.css";
import { fetchIngredients, type IngredientDto } from "@/lib/api/clientApi";

interface Ingredient {
  id: string;
  name: string;
}
interface SelectedIngredient {
  id: string;
  name: string;
  desc: string;
}

const Ingredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  useEffect(() => {
    fetchIngredients()
      .then((data: IngredientDto[]) => {
        const ingredientsWithIds = data.map((item) => ({
          id: item._id,
          name: item.name,
        }));
        setIngredients(ingredientsWithIds);
      })
      .catch((error) => console.error("Failed to fetch ingredients", error));
  }, []);

  return (
    <div className={css.infoForm}>
      <label className={css.label}>Name</label>
      <select
        className={css.field}
        value={selectedIngredientId}
        onChange={(e) => setSelectedIngredientId(e.target.value)}
      >
        <option value="" disabled>
          Broccoli
        </option>
        {ingredients.map((ing) => (
          <option key={ing.id} value={ing.id}>
            {ing.name}
          </option>
        ))}
      </select>

      <label className={css.label}>Amount</label>
      <input
        className={css.field}
        type="text"
        value={quantity}
        placeholder="100g"
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button className={css.button} type="button">
        Add new Ingredient
      </button>
    </div>
  );
};

export default Ingredients;
