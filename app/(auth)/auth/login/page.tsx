'use client';

import useAuthStore from '@/lib/store/authStore';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import { login } from '@/lib/api/clientApi';
import { loginValidationSchema } from '@/lib/validation/authSchemas';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';
import Button from '@/components/buttons/Buttons';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: LoginFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const user = await login(values);
      setUser(user);
      router.push('/');
    } catch (err: any) {
      import('izitoast').then((iziToast) => {
        iziToast.default.error({
          title: 'Error',
          message:
            err?.response?.data?.message ||
            'Login error. Please check your credentials.',
          position: 'topRight',
        });
      });
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <section className={styles.page}>
      <div className={styles.formWrapper}>
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className={styles.form}>
              <h1 className={styles.formTitle}>Login</h1>
              <p className={styles.formDecription}>
                Welcome back! Log in to access your saved recipes and exclusive features.
              </p>

              <div className={styles.wrapper}>
                <div className={styles.wrapperInputs}>
                  <div className={styles.formGroup}>
                    <label htmlFor={`login-email`}>Enter your email address</label>
                    <Field
                      className={`${styles.input} ${
                        errors.email && touched.email ? styles.errorInput : ''
                      }`}
                      id={`login-email`}
                      type="email"
                      name="email"
                      placeholder="email@gmail.com"
                      required
                    />
                    <ErrorMessage name="email" component="span" className={styles.errorMessage} />
                  </div>

                  <div className={`${styles.formGroup} ${styles.formGroupPassword}`}>
                    <label htmlFor={`login-password`}>Enter your password</label>
                    <Field
                      className={`${styles.input} ${styles.inputPassword} ${
                        errors.password && touched.password ? styles.errorInput : ''
                      }`}
                      id={`login-password`}
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="********"
                      required
                    />
                    <ErrorMessage
                      name="password"
                      component="span"
                      className={styles.errorMessage}
                    />

                    <button
                      className={styles.iconBtn}
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <SvgIcon
                        className={styles.icon}
                        name={showPassword ? 'eye_opened' : 'eye_closed'}
                      />
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="brown"
                  size="md"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Loading...' : 'Login'}
                </Button>
              </div>

              <p className={styles.qusetionLogIn}>
                Don't have an account?{' '}
                <Link className={styles.qusetionLogInAccent} href={'/auth/register'}>
                  Register
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default LoginPage;
