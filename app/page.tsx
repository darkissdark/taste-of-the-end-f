'use client';

import Image from 'next/image';
import { useState } from 'react';
import { SearchBox } from '@/components/recipes/SearchBox/SearchBox';
// import { Filters } from '@/components/recipes/Filters/Filters';
// import RecipesList from '@/components/recipes/RecipesList/RecipesList';
// import LoadMoreBtn from '@/components/recipes/LoadMoreBtn/LoadMoreBtn';
// import Pagination from '@/components/recipes/Pagination/Pagination';
import styles from './MainPage.module.css';
import { RecipeDto } from '@/lib/api/clientApi';
// import { pageMeta } from '@/lib/seo';

// export const generateMetadata = () =>
//   pageMeta({ title: 'Home', description: 'Browse all recipes' });

interface FilterState {
  category: string;
  difficulty: string;
  cookTime: string;
}

export default function Page() {
  const [recipes, setRecipes] = useState<RecipeDto[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    difficulty: '',
    cookTime: '',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usePagination, setUsePagination] = useState<boolean>(false);

  const handleSearch = (results: RecipeDto[]) => {
    setRecipes(results);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleLoadMore = () => setCurrentPage((prev) => prev + 1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <main className={styles.mainPage}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <picture>
            {/* Desktop WebP */}
            <source
              media="(min-width: 1440px)"
              type="image/webp"
              srcSet="/banner/banner-desk.webp 1x, /banner/banner-desk@2x.webp 2x"
            />
            {/* Desktop JPEG */}
            <source
              media="(min-width: 1440px)"
              srcSet="/banner/banner-desk.jpg 1x, /banner/banner-desk@2x.jpg 2x"
            />
            {/* Tablet WebP */}
            <source
              media="(min-width: 768px)"
              type="image/webp"
              srcSet="/banner/banner-tab.webp 1x, /banner/banner-tab@2x.webp 2x"
            />
            {/* Tablet JPEG */}
            <source
              media="(min-width: 768px)"
              srcSet="/banner/banner-tab.jpg 1x, /banner/banner-tab@2x.jpg 2x"
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

          {/* SEARCH BOX */}
          <div className={styles.search}>
            <SearchBox onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className={styles.filtersSection}>
        {/* <Filters filters={filters} onFilterChange={handleFilterChange} /> */}
      </section>

      {/* RECIPES LIST */}
      <section className={styles.recipesSection}>
        {/* <RecipesList
          recipes={recipes}
          currentPage={currentPage}
          usePagination={usePagination}
        /> */}
      </section>

      {/* PAGINATION */}
      <section className={styles.paginationSection}>
        {/* {usePagination ? (
          <Pagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={handlePageChange}
          />
        ) : (
          <LoadMoreBtn onClick={handleLoadMore} isLoading={false} />
        )} */}
      </section>
    </main>
  );
}
