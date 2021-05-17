import bcrypt from "bcryptjs";
import { getRepository } from "typeorm";
import { User } from "../../entity/User";

export const login = async (username: string, password: string) => {
  const user = await getRepository(User).find({ username: username });
  if (user.length) {
    const compared = await bcrypt.compare(password, user[0].password);
    if (compared) {
      return true;
    }
  }
  return false;
};
