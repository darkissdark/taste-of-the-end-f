import css from './RegistrationForm.module.css';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import Button from '@/components/buttons/Buttons';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';
import { useId, useState } from 'react';
import { ValuesRegister } from '@/types/auth';
import { RegistrationSchema } from '@/lib/validation/authSchemas';

interface formValues {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

interface Props {
  onSubmit: (
    values: ValuesRegister,
    actions: FormikHelpers<ValuesRegister>
  ) => void | Promise<void>;
  isLoading: boolean;
}

const RegistrationForm = ({ onSubmit, isLoading }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const fieldId = useId();

  const handleClickPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickPasswordConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  const initialValues: formValues = {
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={RegistrationSchema}>
      {({ errors, touched }) => (
        <Form className={css.form}>
          <h1 className={css.formTitle}>Register</h1>
          <p className={css.formDecription}>
            Join our community of culinary enthusiasts, save your favorite recipes, and share your
            cooking creations
          </p>

          <div className={css.wrapper}>
            <div className={css.wrapperInputs}>
              <div className={css.formGroup}>
                <label className={css.label} htmlFor={`${fieldId}-email`}>
                  Enter your email address
                </label>
                <Field
                  className={`${css.input} ${errors.email && touched.email ? css.errorInput : ''}`}
                  id={`${fieldId}-email`}
                  type="email"
                  name="email"
                  placeholder="email@gmail.com"
                  required
                />
                <ErrorMessage name="email" component="span" className={css.errorMessage} />
              </div>

              <div className={css.formGroup}>
                <label className={css.label} htmlFor={`${fieldId}-name`}>
                  Enter your name
                </label>
                <Field
                  className={`${css.input} ${errors.name && touched.name ? css.errorInput : ''}`}
                  id={`${fieldId}-name`}
                  type="text"
                  name="name"
                  placeholder="Max"
                  required
                />
                <ErrorMessage name="name" component="span" className={css.errorMessage} />
              </div>

              <div className={css.formGroup}>
                <label className={css.label} htmlFor={`${fieldId}-password`}>
                  Create a strong password
                </label>

                <div className={css.formGroupPassword}>
                  <Field
                    className={`${css.input} ${css.inputPassword} ${
                      errors.password && touched.password ? css.errorInput : ''
                    }`}
                    id={`${fieldId}-password`}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="********"
                    required
                  />

                  <button className={css.iconBtn} type="button" onClick={handleClickPassword}>
                    {showPassword ? (
                      <SvgIcon className={css.icon} name="eye_opened"></SvgIcon>
                    ) : (
                      <SvgIcon className={css.icon} name="eye_closed" />
                    )}
                  </button>
                </div>
                <ErrorMessage name="password" component="span" className={css.errorMessage} />
              </div>

              <div className={css.formGroup}>
                <label className={css.label} htmlFor={`${fieldId}-passwordConfirm`}>
                  Repeat your password
                </label>
                <div className={css.formGroupPassword}>
                  <Field
                    className={`${css.input} ${css.inputPassword} ${
                      errors.passwordConfirm && touched.passwordConfirm ? css.errorInput : ''
                    }`}
                    id={`${fieldId}-passwordConfirm`}
                    type={showConfirm ? 'text' : 'password'}
                    name="passwordConfirm"
                    placeholder="********"
                    required
                  />

                  <button
                    className={css.iconBtn}
                    type="button"
                    onClick={handleClickPasswordConfirm}
                  >
                    {showConfirm ? (
                      <SvgIcon className={css.icon} name="eye_opened"></SvgIcon>
                    ) : (
                      <SvgIcon className={css.icon} name="eye_closed" />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="passwordConfirm"
                  component="span"
                  className={css.errorMessage}
                />
              </div>
            </div>

            {isLoading ? (
              <Button type="submit" variant="brown" size="md" className={css.submitButton} disabled>
                Loading...
              </Button>
            ) : (
              <Button type="submit" variant="brown" size="md" className={css.submitButton}>
                Create account
              </Button>
            )}
          </div>

          <p className={css.qusetionLogIn}>
            Already have an account?{' '}
            <Link className={css.qusetionLogInAccent} href={'/auth/login'}>
              Log in
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
