import * as Yup from "yup";

const baseSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email provided")
    .required("Email address is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

export const signUpSchema = baseSchema.shape({
  fullname: Yup.string().required("Full name is required"),
});

export { baseSchema as loginSchema };
