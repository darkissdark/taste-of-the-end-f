'use client';
import css from './SearchBox.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';

const validationSchema = Yup.object({
  search: Yup.string().min(2, 'Мінімум 2 символи').optional(),
});

export function SearchBox({ onSearch, value }: { onSearch: (v: string) => void; value: string }) {
  const formik = useFormik({
    initialValues: { search: value || '' },
    enableReinitialize: false,
    validationSchema,
    onSubmit(values) {
      onSearch(values.search.trim());
    },
  });

  useEffect(() => {
    if (value !== formik.values.search) {
      formik.setFieldValue('search', value);
    }
  }, [value, formik]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={css.form}
      role="search"
      aria-label="Recipe search form"
    >
      <label htmlFor="search" className={css.label}>
        Search
      </label>
      <input
        id="search"
        type="text"
        name="search"
        value={formik.values.search}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Search recipes..."
        aria-invalid={formik.touched.search && !!formik.errors.search}
        aria-describedby={formik.errors.search ? 'search-error' : undefined}
      />
      <button type="submit">Search</button>
      {formik.touched.search && formik.errors.search && (
        <div id="search-error" role="alert">
          {formik.errors.search}
        </div>
      )}
    </form>
  );
}
