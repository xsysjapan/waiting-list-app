import { LoginFormValues, User } from "../models";

interface SuccessfulResult {
  succeeded: true;
}

interface ErrorResult {
  succeeded: false;
  message: string;
}

export async function login(
  values: LoginFormValues
): Promise<SuccessfulResult | ErrorResult> {
  if (values.username === "admin" && values.password === "P@ssw0rd") {
    return {
      succeeded: true,
    };
  } else {
    return {
      succeeded: false,
      message: "ユーザー名またはパスワードが正しくありません。",
    };
  }
}

interface SessionResult extends SuccessfulResult {
  user: User;
}

export async function session(): Promise<SessionResult | ErrorResult> {
  return {
    succeeded: true,
    user: {
      username: "admin",
      name: "管理者",
    },
  };
}
