"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import styles from "./SearchBox.module.css";
import { fetchRecipes, RecipeDto } from "@lib/api/clientApi";

interface SearchBoxProps {
  onSearch: (results: RecipeDto[]) => void;
  placeholder?: string;
}

const validationSchema = Yup.object().shape({
  query: Yup.string()
    .required("Введіть текст для пошуку")
    .min(2, "Мінімум 2 символи"),
});

export function SearchBox({ onSearch, placeholder }: SearchBoxProps) {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: { query: "" },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Отримуємо всі рецепти
        let data = await fetchRecipes();

        // Якщо користувач ввів текст, фільтруємо за назвою
        if (values.query.trim() !== "") {
          const queryLower = values.query.toLowerCase();
          data = data.filter((recipe) =>
            recipe.title.toLowerCase().includes(queryLower)
          );
        }

        if (!data || data.length === 0) {
          toast("Рецептів не знайдено");
          onSearch([]); // очищаємо результати
        } else {
          onSearch(data); // передаємо результати у MainPage
          toast.success("Рецепти завантажено");
        }
      } catch (err) {
        console.error(err);
        toast.error("Помилка запиту. Спробуйте ще раз.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          name="query"
          placeholder={placeholder || "Search recipes"}
          value={formik.values.query}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${styles.searchInput} ${
            formik.touched.query && formik.errors.query ? styles.inputError : ""
          }`}
        />
        <button type="submit" className={styles.searchButton} disabled={isLoading}>
          {isLoading ? "Завантаження..." : "Пошук"}
        </button>
      </form>

      {formik.touched.query && formik.errors.query && (
        <div className={styles.errorMessage}>{formik.errors.query}</div>
      )}

      <Toaster position="top-right" />
    </>
  );
}
