'use client';
import { useEffect, useState } from 'react';
import css from './AddRecipeForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { fetchCategories, addRecipe, AddRecipeRequest } from '@/lib/api/clientApi';
import Ingredients from './Ingredients/Ingredients';
import UploadPhoto from './UploadPhoto/UploadPhoto';
import Button from '@/components/buttons/Buttons';
import { SvgIcon } from '@/components/ui/icons/SvgIcon';
import { useRouter } from 'next/navigation';

interface AddRecipeFormValues {
  title: string;
  shortDescription: string;
  cookingTime: string;
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
  shortDescription: '',
  cookingTime: '',
  calories: '',
  category: '',
  instructions: '',
  recipeImg: null,
};

const ValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Recipe title is required')
    .max(64, 'Title must be at most 64 characters'),
  shortDescription: Yup.string()
    .required('Description is required')
    .max(200, 'Description must be at most 200 characters'),
  cookingTime: Yup.string()
    .min(1, 'Cooking time must be at least 1 minute')
    .max(360, 'Cooking time must be at most 360 minutes')
    .required('Cooking time is required'),
  calories: Yup.string()
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

    const data: AddRecipeRequest = {
      title: values.title,
      shortDescription: values.shortDescription,
      cookingTime: Number(values.cookingTime),
      calories: values.calories ? Number(values.calories) : undefined,
      category: values.category,
      instructions: values.instructions,
      ingredients: selectedIngredients.map(({ id, name, quantity }) => ({
        id,
        name,
        quantity,
      })),
      recipeImg: values.recipeImg || undefined,
    };

    try {
      const createdRecipe = await addRecipe(data);
      router.push(`/recipe/${createdRecipe.id}`);
    } catch (error) {
      console.error('Failed to add recipe:', error);
      alert('Failed to add recipe. Please try again.');
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
                  <label htmlFor="shortDescription" className={css.label}>
                    Recipe Description
                  </label>
                  <Field
                    id="shortDescription"
                    name="shortDescription"
                    as="textarea"
                    placeholder="Enter a brief description of your recipe"
                    className={css.fieldDescription}
                  />
                  <ErrorMessage
                    name="shortDescription"
                    component="div"
                    className={css.errorMessage}
                  />
                </div>
                <div>
                  <label htmlFor="cookingTime" className={css.label}>
                    Cooking time in minutes
                  </label>
                  <Field
                    id="cookingTime"
                    name="cookingTime"
                    type="number"
                    placeholder="10"
                    className={css.field}
                  />
                  <ErrorMessage name="cookingTime" component="div" className={css.errorMessage} />
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
              <div>
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
            <Button type="submit" variant="brown" size="lg" className="myCustomClass">
              Publish Recipe
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRecipeForm;
