import React, { useState, useEffect, useRef } from 'react';
import css from './AddRecipeForm.module.css';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';

interface CategorySelectProps {
  categories: string[];
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  categories,
  value,
  error,
  touched,
  onChange,
  onBlur,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onBlur]);

  const selectedName = value || 'Soup';
  const handleSelect = (category: string) => {
    onChange(category);
    setIsDropdownOpen(false);
  };
  const handleToggleDropdown = () => {
    setIsDropdownOpen((open) => {
      if (open) {
        onBlur();
      }
      return !open;
    });
  };

  return (
    <div className={css.categoryForm} ref={dropdownRef}>
      <label className={css.label}>Category</label>
      <div
        className={`${css.field} ${value ? css.hasValue : ''} ${
          error && touched ? css.fieldError : ''
        }`}
        onClick={handleToggleDropdown}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggleDropdown();
          }
        }}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isDropdownOpen}
      >
        <span className={value ? undefined : css.placeholderText}>{selectedName}</span>
        <SvgIcon
          name={isDropdownOpen ? 'close_dropdown' : 'open_dropdown'}
          aria-hidden
          className={css.arrowIcon}
        />
      </div>

      {isDropdownOpen && (
        <ul role="listbox" className={css.optionList} tabIndex={-1} aria-label="Category list">
          {categories.map((cat) => (
            <li
              key={cat}
              role="option"
              aria-selected={value === cat}
              className={css.optionItem}
              tabIndex={0}
              onClick={() => handleSelect(cat)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect(cat);
                }
              }}
            >
              {cat}
            </li>
          ))}
        </ul>
      )}
      {error && touched && <div className={css.errorMessage}>{error}</div>}
    </div>
  );
};

export default CategorySelect;
