import { parseCookie } from "@/lib/helpers";
import { cookies } from "next/headers";

export const setSession = (jwtCookie: string) => {
  const { name, value, options } = parseCookie(jwtCookie);
  cookies().set(name, value, options);
};

export const getSession = async () => {
  const jwtCookie = cookies().get("jwt")?.value;
  return jwtCookie ? jwtCookie : null;
};
