'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import styles from './SearchBox.module.css';

interface SearchBoxProps {
  placeholder?: string;
}

const validationSchema = Yup.object().shape({
  query: Yup.string().min(2, 'Мінімум 2 символи'),
});

export function SearchBox({ placeholder }: SearchBoxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const initialQuery = searchParams.get('query') || '';

  const formik = useFormik({
    initialValues: { query: initialQuery },
    validationSchema,
    onSubmit: async (values) => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (values.query.trim()) {
        params.set('query', values.query.trim());
      } else {
        params.delete('query');
      }
      params.delete('page');
      
      startTransition(() => {
        router.push(`/?${params.toString()}`);
        toast.success('Пошук виконано');
      });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          name="query"
          placeholder={placeholder || 'Search recipes'}
          value={formik.values.query}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${styles.searchInput} ${
            formik.touched.query && formik.errors.query ? styles.inputError : ''
          }`}
        />
        <button 
          type="submit" 
          className={styles.searchButton} 
          disabled={isPending}
        >
          {isPending ? 'Завантаження...' : 'Пошук'}
        </button>
      </form>

      {formik.touched.query && formik.errors.query && (
        <div className={styles.errorMessage}>{formik.errors.query}</div>
      )}

      <Toaster position="top-right" />
    </>
  );
}