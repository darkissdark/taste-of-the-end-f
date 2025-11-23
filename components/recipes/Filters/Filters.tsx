'use client';

import { useState, useEffect, useRef } from 'react';
import { Ingredient } from '@/types/recipe';
import css from './Filters.module.css';
import { DesktopFilters } from './DesktopFilters';
import { MobileFiltersForm } from './MobileFiltersForm';

interface FiltersProps {
  onChange: (filters: { category?: string; ingredient?: string; search?: string }) => void;
  categories: string[];
  ingredients: Ingredient[];
  selectedCategory?: string;
  selectedIngredient?: string;
  total?: number;
}

export default function Filters({
  onChange,
  categories,
  ingredients,
  selectedCategory = '',
  selectedIngredient = '',
  total = 0,
}: FiltersProps) {
  const [open, setOpen] = useState(false);
  const [openCats, setOpenCats] = useState(false);
  const [openIngr, setOpenIngr] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpenCats(false);
        setOpenIngr(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={rootRef} className={css.root}>
      <div className={css.bar}>
        <span className={css.total}>{total} recipes</span>
        <button
          type="button"
          className={css.toggle}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={css.toggleText}>Filters</span>
          {!open && (
            <svg className="iconFilter" width="24" height="24" aria-hidden="true">
              <use
                href="/svg-filter/icons.svg#icon-filter"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
              />
            </svg>
          )}
          {open && (
            <svg className="iconFilter" width="24" height="24" aria-hidden="true">
              <use
                href="/svg-filter/icons.svg#icon-exit-filters-menu"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
              />
            </svg>
          )}
        </button>

        {/* Desktop inline filters (>=1440px) */}
        <DesktopFilters
          categories={categories}
          ingredients={ingredients}
          selectedCategory={selectedCategory}
          selectedIngredient={selectedIngredient}
          openCats={openCats}
          openIngr={openIngr}
          setOpenCats={setOpenCats}
          setOpenIngr={setOpenIngr}
          onChange={onChange}
        />
      </div>

      {open && (
        <MobileFiltersForm
          openCats={openCats}
          openIngr={openIngr}
          setOpenCats={setOpenCats}
          setOpenIngr={setOpenIngr}
          categories={categories}
          ingredients={ingredients}
          selectedCategory={selectedCategory}
          selectedIngredient={selectedIngredient}
          onChange={onChange}
        />
      )}
    </div>
  );
}
