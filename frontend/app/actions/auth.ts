"use server";

import config from "@/config";
import { parseCookie } from "@/lib/helpers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = config.apiUrl + "/auth";
export const signup = async (
  fullname: string,
  email: string,
  password: string
) => {
  const baseUrl = BASE_URL + "/signup";
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullname, email, password }),
    });

    const jwtCookie = response.headers.getSetCookie();

    if (jwtCookie?.length) {
      const { name, value, options } = parseCookie(jwtCookie[0]);
      cookies().set(name, value, options);
    }
    return redirect("/");
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  const baseUrl = BASE_URL + "/login";
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const jwtCookie = response.headers.getSetCookie();

    if (jwtCookie?.length) {
      const { name, value, options } = parseCookie(jwtCookie[0]);
      cookies().set(name, value, options);
    }
    return redirect("/");
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    cookies().delete("jwt");
    const baseUrl = BASE_URL + "/logout";
    const response = await fetch(baseUrl);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
