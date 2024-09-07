import config from "@config";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

/**
 * Validates the password against the hashed password stored in the database.
 * @param candidatePassword The password to compare against
 * @param originalPassword The original password to compare with
 * @returns If password is valid or not
 */
export const comparePassword = async function (
  candidatePassword: string,
  originalPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, originalPassword);
};

/**
 * Hashes the plain text password
 * @param password The plain password to hash
 * @returns Hashed password
 */
export const hashPassword = async function (password: string) {
  const salt = await bcrypt.genSalt(config.bcrypt.saltRounds);
  return await bcrypt.hash(password, salt);
};

export const generateJWT = (data: { [key: string]: any }) => {
  const token = jwt.sign({ ...data }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
  return token;
};
