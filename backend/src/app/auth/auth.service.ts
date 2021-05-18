import bcrypt from "bcryptjs";
import { getRepository } from "typeorm";
import { User } from "../../entity/User";

export const login = async (username: string, password: string) => {
  const users = await getRepository(User).find({ username: username });
  if (users.length) {
    const user = users[0];
    const compared = await bcrypt.compare(password, user.password);
    if (compared) {
      return {
        succeeded: true,
        user: user,
      };
    }
  }
  return {
    succeeded: true,
  };
};
