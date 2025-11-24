'use client';
import css from './SearchEmpty.module.css';

interface SearchEmptyProps {
  onReset: () => void;
}

export function SearchEmpty({ onReset }: SearchEmptyProps) {
  return (
    <div className={css.root} role="status" aria-live="polite">
      <p className={css.message}>We’re sorry! We were not able to find a match.</p>
      <button type="button" className={css.resetBtn} onClick={onReset}>
        Reset search and filters
      </button>
    </div>
  );
}

export default SearchEmpty;
