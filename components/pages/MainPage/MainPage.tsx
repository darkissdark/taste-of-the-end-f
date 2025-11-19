"use client";

import Image from 'next/image';
import { useState } from 'react';
import { SearchBox } from '@/components/recipes/SearchBox/SearchBox';
import Filters from '@/components/Filters/Filters';
import RecipesList from '@/components/RecipesList/RecipesList';
import LoadMoreBtn from '@/components/LoadMoreBtn/LoadMoreBtn';
import Pagination from '@/components/Pagination/Pagination';
import styles from './MainPage.module.css';
import { RecipeDto } from '@/lib/api/clientApi';

interface FilterState {
  category: string;
  difficulty: string;
  cookTime: string;
}

export function MainPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recipes, setRecipes] = useState<RecipeDto[]>([]);
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
      <section className={styles.hero}>
        <div className={styles.container}>
  <picture>
    {/* Desktop WebP */}
    <source 
      media="(min-width: 1440px)" 
      type="image/webp"
      srcSet="
        /banner/banner-desk.webp 1x,
        /banner/banner-desk@2x.webp 2x
      "
    />
    {/* Desktop JPEG */}
    <source 
      media="(min-width: 1440px)" 
      srcSet="
        /banner/banner-desk.jpg 1x,
        /banner/banner-desk@2x.jpg 2x
      "
    />

    {/* Tablet WebP */}
    <source 
      media="(min-width: 768px)" 
      type="image/webp"
      srcSet="
        /banner/banner-tab.webp 1x,
        /banner/banner-tab@2x.webp 2x
      "
    />
    {/* Tablet JPEG */}
    <source 
      media="(min-width: 768px)" 
      srcSet="
        /banner/banner-tab.jpg 1x,
        /banner/banner-tab@2x.jpg 2x
      "
    />

    {/* Mobile */}
    <Image
      src="/banner/banner-mob.jpg"
      alt="Girl cooking delicious food"
      fill
      priority
      className={styles.heroImage}
    />
  </picture>
    <h1 className={styles.heroTitle}>Plan, Cook, and Share Your Flavors</h1>
</div>
      </section>



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