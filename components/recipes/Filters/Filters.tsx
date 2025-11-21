'use client';

import { Ingredient } from '@/types/recipe';

interface FiltersProps {
  onChange: (filters: { category?: string; ingredient?: string }) => void;
  categories: string[];
  ingredients: Ingredient[];
  selectedCategory?: string;
  selectedIngredient?: string;
}

export default function Filters({
  onChange,
  categories,
  ingredients,
  selectedCategory = '',
  selectedIngredient = '',
}: FiltersProps) {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <select value={selectedCategory} onChange={(e) => onChange({ category: e.target.value })}>
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select value={selectedIngredient} onChange={(e) => onChange({ ingredient: e.target.value })}>
        <option value="">All ingredients</option>
        {ingredients.map((i) => (
          <option key={i._id} value={i.name}>
            {i.name}
          </option>
        ))}
      </select>
    </div>
  );
}
