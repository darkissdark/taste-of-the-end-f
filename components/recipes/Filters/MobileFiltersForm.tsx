'use client';
import React from 'react';
import { Ingredient } from '@/types/recipe';
import css from './Filters.module.css';
import { FilterDropdown } from './FilterDropdown';

interface MobileFiltersFormProps {
  openCats: boolean;
  openIngr: boolean;
  setOpenCats: (v: boolean) => void;
  setOpenIngr: (v: boolean) => void;
  categories: string[];
  ingredients: Ingredient[];
  selectedCategory: string;
  selectedIngredient: string;
  onChange: (filters: { category?: string; ingredient?: string }) => void;
}

export function MobileFiltersForm({
  openCats,
  openIngr,
  setOpenCats,
  setOpenIngr,
  categories,
  ingredients,
  selectedCategory,
  selectedIngredient,
  onChange,
}: MobileFiltersFormProps) {
  const categoryOptions = categories.map((c) => ({ key: c, label: c, value: c }));
  const ingredientOptions = ingredients.map((i) => ({ key: i._id, label: i.name, value: i.name }));

  return (
    <form className={css.form} aria-label="Filters" onSubmit={(e) => e.preventDefault()}>
      <FilterDropdown
        label="Category"
        selected={selectedCategory}
        options={categoryOptions}
        isOpen={openCats}
        onToggle={() => setOpenCats(!openCats)}
        onSelect={(val) => {
          onChange({ category: val });
          setOpenCats(false);
        }}
        listAriaLabel="Category list"
        wrapperClassName={css.dropdownWrap}
      />

      <FilterDropdown
        label="Ingredient"
        selected={selectedIngredient}
        options={ingredientOptions}
        isOpen={openIngr}
        onToggle={() => setOpenIngr(!openIngr)}
        onSelect={(val) => {
          onChange({ ingredient: val });
          setOpenIngr(false);
        }}
        listAriaLabel="Ingredient list"
        wrapperClassName={css.dropdownWrap}
      />

      <div className={css.actions}>
        <button
          type="button"
          className={css.reset}
          onClick={() => {
            onChange({ category: '', ingredient: '' });
          }}
        >
          Reset filters
        </button>
      </div>
    </form>
  );
}
