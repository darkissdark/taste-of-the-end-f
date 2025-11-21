'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  search: Yup.string().min(2, 'Мінімум 2 символи'),
});

export function SearchBox({ onSearch, value }: { onSearch: (v: string) => void; value: string }) {
  const formik = useFormik({
    initialValues: { search: '' },
    validationSchema,
    onSubmit(values) {
      onSearch(values.search.trim());
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="text"
        name="search"
        value={formik.values.search}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Search recipes..."
      />

      <button type="submit">Search</button>

      {formik.touched.search && formik.errors.search && <div>{formik.errors.search}</div>}
    </form>
  );
}
