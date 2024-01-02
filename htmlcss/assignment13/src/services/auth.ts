import bcrypt from "bcrypt";
import users from "../model/users";

export const signup = async (email: string, password: string) => {
  const hashedpass = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, email, password: hashedpass };
  users.push(user);
  return user;
};

export const login = async (email: string, password: string) => {
  const user = users.find((user) => {
    return user.email === email;
  });

  if (!user) return null;

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return null;

  return user;
};
