'use client';

import { useRouter } from 'next/navigation';
import css from './SignInPage.module.css';
import { useState } from 'react';
import { login, LoginRequest } from '@/lib/api/clientApi';
import { isAxiosError } from 'axios';
import useAuthStore from '@/lib/store/authStore';

const formDataToObject = (formData: FormData): LoginRequest => {
  return {
    email: formData.get('email')?.toString() || '',
    password: formData.get('password')?.toString() || '',
  };
};

function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = formDataToObject(formData);
      const res = await login(formValues);
      if (res) {
        setUser(res);
        router.push('/');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log('Axios error:', error.response);
        setError(
          error.response?.data?.response?.validation?.body?.message ||
            error.response?.data?.response?.message ||
            'Login failed try again later.'
        );
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}

export default SignInPage;
