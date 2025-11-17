import * as Yup from 'yup';

export const RegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .max(128, 'Email is too long')
    .required('Email is required'),
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(16, 'Name is too long')
    .matches(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers and "_" are allowed')
    .required('Name is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password is too long')
    .required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});
