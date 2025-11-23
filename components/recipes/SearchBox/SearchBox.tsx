'use client';
import css from './SearchBox.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  search: Yup.string().min(2, 'Мінімум 2 символи'),
});

export function SearchBox({ onSearch, value }: { onSearch: (v: string) => void; value: string }) {
  const formik = useFormik({
    initialValues: { search: value },
    validationSchema,
    onSubmit(values) {
      onSearch(values.search.trim());
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={css.searchForm}>
      <input
        type="text"
        name="search"
        value={formik.values.search}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Search recipes..."
        className={`${css.searchInput} ${
          formik.touched.search && formik.errors.search ? css.inputError : ''
        }`}
      />

      <button type="submit" className={css.searchButton}>
        Search
      </button>

      {formik.touched.search && formik.errors.search && (
        <div className={css.errorMessage}>{formik.errors.search}</div>
      )}
    </form>
  );
}