'use client';
import { useEffect, useState } from 'react';
import css from './AddRecipeForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { setNestedObjectValues } from 'formik';
import { fetchCategories, addRecipe } from '@/lib/api/clientApi';
import Ingredients from './Ingredients/Ingredients';
import UploadPhoto from './UploadPhoto/UploadPhoto';
import Button from '@/components/buttons/Buttons';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface AddRecipeFormValues {
  title: string;
  description: string;
  time: string;
  calories: string;
  category: string;
  instructions: string;
  recipeImg: File | null;
}
interface SelectedIngredient {
  id: string;
  name: string;
  quantity: string;
}
const initialValues: AddRecipeFormValues = {
  title: '',
  description: '',
  time: '',
  calories: '',
  category: '',
  instructions: '',
  recipeImg: null,
};

const ValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Recipe title is required')
    .max(64, 'Title must be at most 64 characters'),
  description: Yup.string()
    .required('Description is required')
    .max(200, 'Description must be at most 200 characters'),
  time: Yup.number()
    .min(1, 'Cooking time must be at least 1 minute')
    .max(360, 'Cooking time must be at most 360 minutes')
    .required('Cooking time is required'),
  calories: Yup.number()
    .min(1, 'Calories must be at least 1')
    .max(10000, 'Calories must be at most 10000')
    .notRequired(),
  category: Yup.string().required('Category is required'),
  instructions: Yup.string()
    .max(1200, 'Instructions must be at most 1200 characters')
    .required('Instructions are required'),
  recipeImg: Yup.mixed()
    .test('fileSize', 'File size must be less than 2MB', (value) => {
      if (!value) return true;
      if (value instanceof File) {
        return value.size <= 2 * 1024 * 1024;
      }
      return false;
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value) return true;
      if (value instanceof File) {
        return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
      }
      return false;
    })
    .notRequired(),
});

const AddRecipeForm = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredient[]>([]);

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Failed to fetch categories', error);
      });
  }, []);

  const handleSubmit = async (values: AddRecipeFormValues, formikHelpers: any) => {
    const { setTouched, setSubmitting, validateForm } = formikHelpers;

    const errors = await validateForm();

    if (Object.keys(errors).length > 0) {
      setTouched(setNestedObjectValues(errors, true));
      toast.error('Please fill in all required fields');
      setSubmitting(false);
      return;
    }

    if (selectedIngredients.length < 2) {
      toast.error('You need to select at least 2 ingredients');
      setSubmitting(false);
      return;
    }

    if (selectedIngredients.length > 16) {
      toast.error('You can select at most 16 ingredients');
      setSubmitting(false);
      return;
    }

    const hasInvalidQuantity = selectedIngredients.some(
      (ing) => !ing.quantity || ing.quantity.trim() === ''
    );

    if (hasInvalidQuantity) {
      toast.error('Please specify quantity for all selected ingredients');
      setSubmitting(false);
      return;
    }
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('time', values.time.toString());
    if (values.calories) formData.append('calories', values.calories.toString());
    formData.append('category', values.category);
    formData.append('instructions', values.instructions);
    formData.append(
      'ingredients',
      JSON.stringify(
        selectedIngredients.map(({ id, quantity }) => ({
          id,
          measure: quantity,
        }))
      )
    );
    if (values.recipeImg) {
      formData.append('recipePhoto', values.recipeImg);
    }
    for (let [key, val] of formData.entries()) {
    }

    try {
      const createdRecipe = await addRecipe(formData);
      const recipeId = createdRecipe.recipe?._id || createdRecipe.id || createdRecipe._id;

      if (!recipeId) {
        toast.error('Recipe ID not returned from server');
        return;
      }
      router.push(`/recipes/${recipeId}`);
    } catch (error: any) {
      if (error.response) {
        toast.error(`Failed to add recipe: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        toast.error('No response from server. Please try again later.');
      } else {
        toast.error('Failed to add recipe. Please try again.');
      }
    }
  };

  return (
    <div className={css.addRecipeContainer}>
      <h3 className={css.addRecipe}>Add Recipe</h3>
      <Formik
        initialValues={{ ...initialValues, recipeImg: null }}
        validationSchema={ValidationSchema}
        onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers)}
      >
        {({ setFieldValue, errors, touched, values, setFieldTouched }) => (
          <Form className={css.formWithPhoto}>
            <div className={css.photoContainer}>
              <p className={css.subtitlePhoto}>Upload Photo</p>
              <UploadPhoto setFieldValue={setFieldValue} />
            </div>
            <div className={css.formContainer}>
              <div className={css.infoForm}>
                <p className={css.subtitle}>General Information</p>
                <div>
                  <label htmlFor="title" className={css.label}>
                    Recipe Title
                  </label>
                  <Field
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter the name of your recipe"
                    className={`${css.field} ${
                      errors.title && touched.title ? css.fieldError : ''
                    }`}
                  />
                  <ErrorMessage name="title" component="div" className={css.errorMessage} />
                </div>
                <div>
                  <label htmlFor="description" className={css.label}>
                    Recipe Description
                  </label>
                  <Field
                    id="description"
                    name="description"
                    as="textarea"
                    placeholder="Enter a brief description of your recipe"
                    className={`${css.fieldDescription} ${
                      errors.description && touched.description ? css.fieldError : ''
                    }`}
                  />
                  <ErrorMessage name="description" component="div" className={css.errorMessage} />
                </div>
                <div>
                  <label htmlFor="time" className={css.label}>
                    Cooking time in minutes
                  </label>
                  <Field
                    id="time"
                    name="time"
                    type="number"
                    placeholder="10"
                    className={`${css.field} ${errors.time && touched.time ? css.fieldError : ''}`}
                  />
                  <ErrorMessage name="time" component="div" className={css.errorMessage} />
                </div>

                <div className={css.caloriesCategory}>
                  <div className={css.categoryForm}>
                    <label htmlFor="calories" className={css.label}>
                      Calories
                    </label>
                    <Field
                      id="calories"
                      name="calories"
                      type="number"
                      placeholder="150 cals"
                      className={`${css.calories} ${
                        errors.calories && touched.calories ? css.fieldError : ''
                      }`}
                    />
                    <ErrorMessage name="calories" component="div" className={css.errorMessage} />
                  </div>
                  <div className={css.categoryForm}>
                    <label htmlFor="category" className={css.label}>
                      Category
                    </label>
                    <Field
                      as="select"
                      name="category"
                      id="category"
                      value={values.category}
                      className={`${css.calories} ${
                        errors.category && touched.category ? css.fieldError : ''
                      } ${values.category ? css.hasValue : ''}`}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setFieldValue('category', e.target.value);
                        setFieldTouched('category', true);
                      }}
                    >
                      <option value="" disabled>
                        Soup
                      </option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </Field>
                    <SvgIcon name="open_dropdown" aria-hidden className={css.arrowIcon} />
                    <ErrorMessage name="category" component="div" className={css.errorMessage} />
                  </div>
                </div>
              </div>

              <Ingredients
                selectedIngredients={selectedIngredients}
                setSelectedIngredients={setSelectedIngredients}
                errors={errors}
                touched={touched}
              />

              <div className={css.instructions}>
                <p className={css.subtitle}>Instructions</p>
                <Field
                  id="instructions"
                  name="instructions"
                  as="textarea"
                  placeholder="Enter a text"
                  className={`${css.fieldDescription} ${css.fieldInstructions} ${
                    errors.instructions && touched.instructions ? css.fieldError : ''
                  }`}
                />
                <ErrorMessage name="instructions" component="div" className={css.errorMessage} />
              </div>

              <Button
                type="submit"
                variant="brown"
                size="xl"
                className={`${'myCustomClass'} ${css.button}`}
              >
                Publish Recipe
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRecipeForm;
