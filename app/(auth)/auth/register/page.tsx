"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, RegisterOrLoginRequest } from "@/lib/api/clientApi";
import css from "./SignUpPage.module.css";
import { isAxiosError } from "axios";
import useAuthStore from "@/lib/store/authStore";

const formDataToObject = (formData: FormData): RegisterOrLoginRequest => {
  return {
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };
};

const SignUpPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = formDataToObject(formData);
      const res = await register(formValues);
      if (res) {
        setUser(res);
        router.push("/profile");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setError(
          error.response?.data?.response?.validation?.body?.message ||
            error.response?.data?.response?.message ||
            "Registration failed try again later."
        );
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign up</h1>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUpPage;
