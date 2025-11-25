'use client';
import React from 'react';
import { Ingredient } from '@/types/recipe';
import css from './Filters.module.css';
import { FilterDropdown } from './FilterDropdown';

interface DesktopFiltersProps {
  categories: string[];
  ingredients: Ingredient[];
  selectedCategory: string;
  selectedIngredient: string;
  openCats: boolean;
  openIngr: boolean;
  setOpenCats: (v: boolean) => void;
  setOpenIngr: (v: boolean) => void;
  onToggleCats: () => void;
  onToggleIngr: () => void;
  onChange: (filters: { category?: string; ingredient?: string; search?: string }) => void;
}

export function DesktopFilters({
  categories,
  ingredients,
  selectedCategory,
  selectedIngredient,
  openCats,
  openIngr,
  setOpenCats,
  setOpenIngr,
  onToggleCats,
  onToggleIngr,
  onChange,
}: DesktopFiltersProps) {
  const categoryOptions = categories.map((c) => ({ key: c, label: c, value: c }));
  const ingredientOptions = ingredients.map((i) => ({ key: i._id, label: i.name, value: i.name }));

  return (
    <div className={css.desktopFilters}>
      <button
        type="button"
        className={css.resetDesktop}
        onClick={() => {
          onChange({ category: '', ingredient: '', search: '' });
          setOpenCats(false);
          setOpenIngr(false);
        }}
      >
        Reset filters
      </button>

      <FilterDropdown
        label="Category"
        selected={selectedCategory}
        options={categoryOptions}
        isOpen={openCats}
        onToggle={onToggleCats}
        onSelect={(val) => {
          onChange({ category: val });
          setOpenCats(false);
        }}
        listAriaLabel="Category list"
        wrapperClassName={css.desktopCategory}
      />

      <FilterDropdown
        label="Ingredient"
        selected={selectedIngredient}
        options={ingredientOptions}
        isOpen={openIngr}
        onToggle={onToggleIngr}
        onSelect={(val) => {
          onChange({ ingredient: val });
          setOpenIngr(false);
        }}
        listAriaLabel="Ingredient list"
        wrapperClassName={css.desktopIngredient}
      />
    </div>
  );
}
