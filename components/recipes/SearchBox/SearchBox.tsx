'use client';

import { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './SearchBox.module.css';

const validationSchema = Yup.object({
  search: Yup.string().min(2, 'Мінімум 2 символи'),
});

export function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const initialSearch = searchParams.get('search') || '';

  const formik = useFormik({
    initialValues: { search: initialSearch },
    validationSchema,
    onSubmit(values) {
      const params = new URLSearchParams(searchParams.toString());

      if (values.search.trim()) params.set('search', values.search.trim());
      else params.delete('search');

      params.delete('page');

      startTransition(() => {
        router.push(`/?${params.toString()}`);
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        name="search"
        value={formik.values.search}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={styles.input}
        placeholder="Search recipes..."
      />

      <button type="submit" disabled={isPending} className={styles.button}>
        {isPending ? 'Loading...' : 'Search'}
      </button>

      {formik.touched.search && formik.errors.search && (
        <div className={styles.error}>{formik.errors.search}</div>
      )}
    </form>
  );
}
