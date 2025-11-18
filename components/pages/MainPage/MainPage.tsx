"use client";

import { useState } from 'react';
import { SearchBox } from '@/components/recipes/SearchBox/SearchBox';
import Filters from '@/components/Filters/Filters';
import RecipesList from '@/components/RecipesList/RecipesList';
import LoadMoreBtn from '@/components/LoadMoreBtn/LoadMoreBtn';
import Pagination from '@/components/Pagination/Pagination';
import styles from './MainPage.module.css';

interface FilterState {
  category: string;
  difficulty: string;
  cookTime: string;
}

export function MainPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    difficulty: '',
    cookTime: ''
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usePagination, setUsePagination] = useState<boolean>(false);

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: FilterState): void => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleLoadMore = (): void => {
    setCurrentPage(prev => prev + 1);
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className={styles.mainPage}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Plan, Cook, and Share Your Flavors</h1>
        </div>

        <div className={styles.search}>
          <SearchBox 
            onSearch={handleSearch}
            placeholder="Search recipes..."
          />
        </div>

        <div className={styles.filters}>
          <Filters 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className={styles.recipes}>
          <RecipesList 
            searchQuery={searchQuery}
            filters={filters}
            currentPage={currentPage}
            usePagination={usePagination}
          />
        </div>

        <div className={styles.pagination}>
          {usePagination ? (
            <Pagination 
              currentPage={currentPage}
              totalPages={5}
              onPageChange={handlePageChange}
            />
          ) : (
            <LoadMoreBtn 
              onClick={handleLoadMore}
              isLoading={false}
            />
          )}
        </div>
      </div>
    </main>
  );
}