import { IUser } from '@user/types';

export const getSafeUser = (user: IUser) => {
  const { password, ...safeUser } = user;
  return safeUser;
};
