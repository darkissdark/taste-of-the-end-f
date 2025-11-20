import { pageMeta } from "@/lib/seo";
import { getServerRecipes } from "@/lib/api/serverApi";
import type { RecipeDto } from "@/lib/api/clientApi";
import { SearchBox } from "@/components/recipes/SearchBox/SearchBox";
// import { Filters } from "@/components/recipes/Filters/Filters";
// import RecipesList from "@/components/recipes/RecipesList/RecipesList";
// import Pagination from "@/components/recipes/Pagination/Pagination";
import styles from "./MainPage.module.css";
import { Metadata } from "next";

export const generateMetadata = (): Metadata =>
  pageMeta({ title: "Home", description: "Browse all recipes" });

interface PageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function Page({ searchParams }: PageProps) {
  const query = typeof searchParams?.query === "string" ? searchParams.query : "";
  const category = typeof searchParams?.category === "string" ? searchParams.category : "";
  const pageNum = parseInt(typeof searchParams?.page === "string" ? searchParams.page : "1");

  const res = await getServerRecipes();
  const allRecipes: RecipeDto[] = res.recipes;

  const filteredRecipes = allRecipes.filter((recipe) => {
    const matchesQuery =
      !query ||
      recipe.title.toLowerCase().includes(query.toLowerCase()) ||
      recipe.desc?.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !category || recipe.category === category;
    return matchesQuery && matchesCategory;
  });

  const recipesPerPage = 12;
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const startIndex = (pageNum - 1) * recipesPerPage;
  const paginatedRecipes = filteredRecipes.slice(startIndex, startIndex + recipesPerPage);

  return (
    <main className={styles.mainPage}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <picture>
            <source
              media="(min-width: 1440px)"
              type="image/webp"
              srcSet="/banner/banner-desk.webp 1x, /banner/banner-desk@2x.webp 2x"
            />
            <source
              media="(min-width: 1440px)"
              srcSet="/banner/banner-desk.jpg 1x, /banner/banner-desk@2x.jpg 2x"
            />
            <source
              media="(min-width: 768px)"
              type="image/webp"
              srcSet="/banner/banner-tab.webp 1x, /banner/banner-tab@2x.webp 2x"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/banner/banner-tab.jpg 1x, /banner/banner-tab@2x.jpg 2x"
            />
            <img
              src="/banner/banner-mob.jpg"
              alt="Girl cooking delicious food"
              className={styles.heroImage}
            />
          </picture>

          <h1 className={styles.heroTitle}>Plan, Cook, and Share Your Flavors</h1>

          <div className={styles.search}>
            <SearchBox/>
          </div>
        </div>
      </section>

      {/* FILTERS SECTION (можеш раскоментити) */}
      {/* <section className={styles.filtersSection}>
        <Filters defaultCategory={category} />
      </section> */}

      {/* RECIPES LIST */}
      {/* <section className={styles.recipesSection}>
        <RecipesList
          recipes={paginatedRecipes}
          currentPage={pageNum}
          usePagination={false} // або true, якщо хочеш компонент пагінації
        />
      </section> */}

      {/* PAGINATION */}
      {/* {totalPages > 1 && (
        <section className={styles.paginationSection}>
          <Pagination currentPage={pageNum} totalPages={totalPages} />
        </section>
      )} */}
    </main>
  );
}
