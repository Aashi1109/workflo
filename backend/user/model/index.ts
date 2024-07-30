import { model, Schema } from "mongoose";
import { IUser } from "../types";

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    fullname: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
