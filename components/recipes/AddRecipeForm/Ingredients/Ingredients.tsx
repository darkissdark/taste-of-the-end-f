'use client';
import { useEffect, useState } from 'react';
import css from './Ingredients.module.css';
import { fetchIngredients, type IngredientDto } from '@/lib/api/clientApi';
import Button from '@/components/buttons/Buttons';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';

interface Ingredient {
  id: string;
  name: string;
}
interface SelectedIngredient {
  id: string;
  name: string;
  quantity: string;
  desc?: string;
}
interface IngredientsProps {
  selectedIngredients: SelectedIngredient[];
  setSelectedIngredients: React.Dispatch<React.SetStateAction<SelectedIngredient[]>>;
}
const Ingredients: React.FC<IngredientsProps> = ({
  selectedIngredients,
  setSelectedIngredients,
}) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');

  useEffect(() => {
    fetchIngredients()
      .then((data: IngredientDto[]) => {
        const ingredientsWithIds = data.map((item) => ({
          id: item._id,
          name: item.name,
        }));
        setIngredients(ingredientsWithIds);
      })
      .catch((error) => console.error('Failed to fetch ingredients', error));
  }, []);

  const addIngredient = () => {
    if (!selectedIngredientId) {
      alert('Ingredient is required');
      return;
    }
    if (!quantity.trim()) {
      alert('Ingredient amount is required');
      return;
    }
    const quantityNumber = Number(quantity);
    if (isNaN(quantityNumber) || quantityNumber < 2 || quantityNumber > 16) {
      alert('Ingredient amount must be at least 2 and at most 16');
      return;
    }

    const ingredient = ingredients.find((ing) => ing.id === selectedIngredientId);
    if (!ingredient) return;

    setSelectedIngredients((prev) => {
      const existIndex = prev.findIndex((ing) => ing.id === selectedIngredientId);
      if (existIndex >= 0) {
        return prev.map((ing, index) => (index === existIndex ? { ...ing, quantity } : ing));
      }
      return [...prev, { id: ingredient.id, name: ingredient.name, quantity }];
    });
  };

  const removeIngredient = (id: string) => {
    setSelectedIngredients((prev) => prev.filter((ing) => ing.id !== id));
  };
  return (
    <div className={css.addIngredient}>
      <div className={css.ingredientForm}>
        <div className={css.name}>
          <label className={css.label}>Name</label>
          <div>
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
            <SvgIcon name="open_dropdown" aria-hidden className={css.arrowIcon} />
          </div>
        </div>
        <div className={css.amount}>
          <label className={css.label}>Amount</label>
          <input
            className={css.field}
            type="text"
            value={quantity}
            placeholder="100g"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
      </div>

      <Button
        type="button"
        variant="brown"
        size="lg"
        className={`${css.myCustomClass} ${css.button}`}
        onClick={addIngredient}
      >
        Add new Ingredient
      </Button>
      {selectedIngredients.length > 0 && (
        <div className={css.addIngredients}>
          <div className={css.addIngredientItem}>
            <p className={css.selectedIngredientName}>Name:</p>
            <p className={css.selectedIngredientName}>Amount:</p>
          </div>

          <ul className={css.selectedIngredientsList}>
            {selectedIngredients.map((ing) => (
              <li key={ing.id} className={css.selectedIngredientItem}>
                <span className={css.selectedIngredient}>{ing.name}</span>
                <span className={css.selectedIngredientQ}>{ing.quantity}</span>
                <button className={css.deleteButton} onClick={() => removeIngredient(ing.id)}>
                  <SvgIcon name="basket" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Ingredients;
