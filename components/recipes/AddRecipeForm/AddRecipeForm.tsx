"use client";
import React from "react";
import css from "./AddRecipeForm.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

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
                    name="category"
                    as="select"
                    className={css.calories}
                  >
                    <option value="" disabled>
                      Soup
                    </option>
                  </Field>
                </div>
              </div>
            </div>

            <div>
              <p className={css.subtitle}>Ingredients</p>
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
