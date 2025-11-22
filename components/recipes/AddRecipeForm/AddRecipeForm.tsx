'use client';
import { useEffect, useState } from 'react';
import css from './AddRecipeForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { fetchCategories, addRecipe } from '@/lib/api/clientApi';
import Ingredients from './Ingredients/Ingredients';
import UploadPhoto from './UploadPhoto/UploadPhoto';
import Button from '@/components/buttons/Buttons';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';
import { useRouter } from 'next/navigation';

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
        console.log('Categories:', data);
        setCategories(data);
      })
      .catch((error) => {
        console.error('Failed to fetch categories', error);
      });
  }, []);

  const handleSubmit = async (values: AddRecipeFormValues) => {
    if (selectedIngredients.length === 0) {
      alert('Please add at least one ingredient');
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

    // Логування для перевірки FormData
    console.log('FormData content:');
    for (let [key, val] of formData.entries()) {
      console.log(key, val);
    }

    try {
      const createdRecipe = await addRecipe(formData);

      console.log('Response from server:', createdRecipe);
      console.log('Response from server:', createdRecipe);
      console.log('Recipe object:', createdRecipe.recipe);
      console.log('Recipe ID:', createdRecipe.recipe?._id);

      const recipeId = createdRecipe.recipe?._id || createdRecipe.id || createdRecipe._id;

      if (!recipeId) {
        alert('Recipe ID not returned from server');
        return;
      }
      router.push(`/recipes/${recipeId}`);
    } catch (error: any) {
      if (error.response) {
        // Лог помилки з сервера
        console.error('Server error data:', error.response.data);
        console.error('Server error status:', error.response.status);
        console.error('Server error headers:', error.response.headers);
        alert(`Failed to add recipe: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // Запит був зроблений, але відповіді не отримано
        console.error('No response received:', error.request);
        alert('No response from server. Please try again later.');
      } else {
        // Інші помилки
        console.error('Error creating request:', error.message);
        alert('Failed to add recipe. Please try again.');
      }
    }
  };

  return (
    <div className={css.addRecipeContainer}>
      <h3 className={css.addRecipe}>Add Recipe</h3>
      <Formik
        initialValues={{ ...initialValues, recipeImg: null }}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className={css.form}>
            <div className={css.photoContainer}>
              <p className={css.subtitle}>Upload Photo</p>
              <UploadPhoto setFieldValue={setFieldValue} />
            </div>
            <div>
              {
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
                      className={css.field}
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
                      className={css.fieldDescription}
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
                      className={css.field}
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
                        className={css.calories}
                      />
                      <ErrorMessage name="calories" component="div" className={css.errorMessage} />
                    </div>
                    <div className={css.categoryForm}>
                      <label htmlFor="category" className={css.label}>
                        Category
                      </label>
                      <Field id="category" as="select" name="category" className={css.calories}>
                        <option value="" disabled>
                          Soup
                        </option>
                        {categories.length === 0 ? (
                          <option disabled>Soup</option>
                        ) : (
                          categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))
                        )}
                      </Field>
                      <SvgIcon name="open_dropdown" aria-hidden className={css.arrowIcon} />
                      <ErrorMessage name="category" component="div" className={css.errorMessage} />
                    </div>
                  </div>
                </div>
              }

              <Ingredients
                selectedIngredients={selectedIngredients}
                setSelectedIngredients={setSelectedIngredients}
              />
              {
                <div className={css.instructions}>
                  <p className={css.subtitle}>Instructions</p>
                  <Field
                    id="instructions"
                    name="instructions"
                    as="textarea"
                    placeholder="Enter a text"
                    className={`${css.fieldDescription} ${css.fieldInstructions}`}
                  />
                  <ErrorMessage name="instructions" component="div" className={css.errorMessage} />
                </div>
              }
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
