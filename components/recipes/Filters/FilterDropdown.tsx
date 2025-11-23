'use client';
import React from 'react';
import css from './Filters.module.css';

interface OptionItem {
  key: string;
  label: string;
  value: string;
}

interface FilterDropdownProps {
  label: string;
  selected: string;
  options: OptionItem[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  listAriaLabel: string;
  wrapperClassName?: string; // e.g. desktopCategory / desktopIngredient / dropdownWrap
}

export function FilterDropdown({
  label,
  selected,
  options,
  isOpen,
  onToggle,
  onSelect,
  listAriaLabel,
  wrapperClassName,
}: FilterDropdownProps) {
  return (
    <div className={wrapperClassName}>
      <button
        type="button"
        className={css.dropdownButton}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className={selected ? css['dropdownButtonValue--selected'] : undefined}>
          {selected || label}
        </span>
        <svg className={css.selectArrowInline} width={16} height={16} aria-hidden>
          <use
            href="/svg-filter/icons.svg#icon-arrow"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <ul role="listbox" className={css.optionList} aria-label={listAriaLabel}>
          {options.map((opt) => (
            <li
              key={opt.key}
              role="option"
              aria-selected={selected === opt.value}
              className={css.optionItem}
              onClick={() => onSelect(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
