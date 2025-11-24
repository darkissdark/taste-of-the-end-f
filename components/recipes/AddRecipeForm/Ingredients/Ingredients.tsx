'use client';
import { useEffect, useState, useRef } from 'react';
import css from './Ingredients.module.css';
import { fetchIngredients, type IngredientDto } from '@/lib/api/clientApi';
import Button from '@/components/buttons/Buttons';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';
import { toast } from 'react-hot-toast';

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
  errors?: { [key: string]: any };
  touched?: { [key: string]: any };
}
const Ingredients: React.FC<IngredientsProps> = ({
  selectedIngredients,
  setSelectedIngredients,
  errors,
  touched,
}) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addIngredient = () => {
    if (!selectedIngredientId) {
      toast.error('Ingredient is required');
      return;
    }
    if (!quantity.trim()) {
      toast.error('Ingredient amount is required');
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

    setSelectedIngredientId('');
    setQuantity('');
    setIsDropdownOpen(false);
  };

  const removeIngredient = (id: string) => {
    setSelectedIngredients((prev) => prev.filter((ing) => ing.id !== id));
  };

  const selectedName =
    ingredients.find((ing) => ing.id === selectedIngredientId)?.name || 'Broccoli';
  return (
    <div className={css.addIngredient}>
      <div className={css.ingredientForm}>
        <div className={css.name} ref={dropdownRef}>
          <label className={css.label}>Name</label>
          <div
            className={`${css.field} ${selectedIngredientId ? css.hasValue : ''}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setIsDropdownOpen(!isDropdownOpen);
            }}
            role="button"
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
          >
            <span>{selectedName}</span>
            <SvgIcon
              name={isDropdownOpen ? 'close_dropdown' : 'open_dropdown'}
              aria-hidden
              className={css.arrowIcon}
            />
          </div>
          {isDropdownOpen && (
            <ul
              role="listbox"
              className={css.optionList}
              tabIndex={-1}
              aria-label="Ingredient list"
            >
              {ingredients.map((opt) => (
                <li
                  key={opt.id}
                  role="option"
                  aria-selected={selectedIngredientId === opt.id}
                  className={css.optionItem}
                  onClick={() => {
                    setSelectedIngredientId(opt.id);
                    setIsDropdownOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedIngredientId(opt.id);
                      setIsDropdownOpen(false);
                    }
                  }}
                  tabIndex={0}
                >
                  {opt.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={css.amount}>
          <label className={css.label}>Amount</label>
          <input
            className={`${css.field} ${
              errors?.quantity && touched?.quantity ? css.fieldError : ''
            }`}
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

      {(!isMobile || (isMobile && selectedIngredients.length > 0)) && (
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
