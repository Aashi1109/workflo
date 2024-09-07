"use client";

import { login, signup } from "@/app/actions/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InferType } from "yup";
import { LabelButton } from "../ui/button";
import { loginSchema, signUpSchema } from "./validation/schema";

const AuthForm = () => {
  const [isLoginForm, setIsLoginForm] = useState(false);

  type LoginFormValues = InferType<typeof loginSchema>;
  type SignUpFormValues = InferType<typeof signUpSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues | SignUpFormValues>({
    resolver: yupResolver(isLoginForm ? loginSchema : signUpSchema),
  });
  const onSubmit = async (data: LoginFormValues | SignUpFormValues) => {
    try {
      if (isLoginForm) {
        const request = await login(data.email, data.password);
      } else {
        const request = await signup(data.fullname, data.email, data.password);
      }
    } catch (error: any) {
      toast.info(
        error?.errors?.message ||
          `Failed to ${isLoginForm ? "login" : "signup"}`,
        {}
      );
    }
  };

  return (
    <div className="flex-center flex-col p-[60px] w-[650px] gap-[--Size-M] bg-gradient-2 bor-3">
      <p className="heading-1">
        Welcome to <span className="text-[--tertiary]">Workflo</span>
      </p>
      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-[--Size-SM]"
      >
        {!isLoginForm && (
          <div>
            <input
              id="fullname"
              {...register("fullname")}
              className="input"
              placeholder="Full name"
            />
            {/* @ts-ignore */}
            {errors?.fullname && (
              // @ts-ignore
              <p className="danger-text">{errors?.fullname?.message}</p>
            )}
          </div>
        )}

        <div>
          <input
            id="email"
            {...register("email")}
            className="input"
            placeholder="Your email"
          />
          {errors.email && (
            <p className="danger-text">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="input"
            placeholder="Password"
          />
          {errors.password && (
            <p className="danger-text">{errors.password.message}</p>
          )}
        </div>

        <LabelButton
          variant="primary"
          label={isLoginForm ? "Login" : "Sign Up"}
          disabled={!isValid}
          classes={{ "opacity-80": !isValid }}
          type="submit"
        />
      </form>

      {/* login/signup toggle */}
      <button onClick={() => setIsLoginForm(!isLoginForm)}>
        {isLoginForm
          ? "Don't have an account? Create a "
          : "Already have an account ? "}
        <span className="text-[--auth-navigate-color]">
          {isLoginForm ? "new account" : "Login"}
        </span>
      </button>
    </div>
  );
};

export default AuthForm;
