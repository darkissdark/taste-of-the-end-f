"use client";
import { useEffect, useState } from "react";
import css from "./AddRecipeForm.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { fetchCategories } from "@/lib/api/serverApi";
import Ingredients from "./Ingredients";

interface AddRecipeFormValues {
  title: string;
  shortDescription: string;
  cookingTime: string;
  calories: string;
  category: string;
  instructions: string;
}
const initialValues = {
  title: "",
  shortDescription: "",
  cookingTime: "",
  calories: "",
  category: "",
  instructions: "",
};
const AddRecipeForm = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        console.log("Categories:", data);
        setCategories(data);
      })
      .catch((error) => {
        console.error("Failed to fetch categories", error);
      });
  }, []);

  return (
    <div className={css.addRecipeContainer}>
      <h3 className={css.addRecipe}>Add Recipe</h3>
      <div className={css.recipeContainer}>
        <div className={css.photoContainer}>
          <p className={css.subtitle}>Upload Photo</p>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log("Publish Recipe:", values);
          }}
        >
          <Form className={css.form}>
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
                </div>
                <div className={css.categoryForm}>
                  <label htmlFor="category" className={css.label}>
                    Category
                  </label>
                  <Field
                    id="category"
                    as="select"
                    name="category"
                    className={css.calories}
                  >
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
                </div>
              </div>
            </div>

            <div>
              <p className={css.subtitle}>Ingredients</p>
              <Ingredients />
            </div>
            <div>
              <p className={css.subtitle}>Instructions</p>
              <Field
                id="instructions"
                name="instructions"
                as="textarea"
                placeholder="Enter a text"
                className={css.fieldDescription}
              />
            </div>
            <button type="submit" className={css.button}>
              Publish Recipe
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddRecipeForm;
