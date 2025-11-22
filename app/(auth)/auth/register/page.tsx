'use client';

import { useEffect, useState } from 'react';
import { register } from '@/lib/api/clientApi';
import css from './SignUpPage.module.css';
import { isAxiosError } from 'axios';
import useAuthStore from '@/lib/store/authStore';
import toast from 'react-hot-toast';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import { FormikHelpers } from 'formik';
import { ValuesRegister } from '@/types/auth';

const SignUpPage = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (values: ValuesRegister, actions: FormikHelpers<ValuesRegister>) => {
    setError('');

    try {
      const { email, name, password } = values;
      setIsLoading(true);
      const res = await register({ email, name, password });

      if (res) {
        setUser(res);
        actions.resetForm();
        window.location.href = '/';
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || 'Registration failed');
      } else {
        setError('Unexpected error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <section className={css.sectionContent}>
      <div className={css.container}>
        <RegistrationForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default SignUpPage;
