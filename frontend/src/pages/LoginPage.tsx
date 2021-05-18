import * as React from "react";
import { LoginFormValues, User } from "../models";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import { login, session } from "../api";

export type LoginPageProps = {
  onLogin: (credential: LoginFormValues) => void;
};

export const LoginPage = (props: LoginPageProps) => {
  const { onLogin } = props;
  return (
    <Layout>
      <h1>ログイン</h1>
      <LoginForm onSubmit={onLogin} />
    </Layout>
  );
};

const handleLogin = async (
  values: LoginFormValues
): Promise<
  { succeeded: true; user: User } | { succeeded: false; message: string }
> => {
  const result = await login(values);
  if (result.succeeded) {
    const result2 = await session();
    if (result2.succeeded) {
      return {
        succeeded: true,
        user: result2.user,
      };
    } else {
      return {
        succeeded: false,
        message: result2.message,
      };
    }
  }
  return {
    succeeded: false,
    message: result.message,
  };
};

const handleSession = async (): Promise<
  { succeeded: true; user: User } | { succeeded: false }
> => {
  const result = await session();
  if (result.succeeded) {
    return {
      succeeded: true,
      user: result.user,
    };
  } else {
    return {
      succeeded: false,
    };
  }
};

const Page = (props: { onLoginSuccess: (user: User) => void }) => {
  const { onLoginSuccess } = props;
  React.useEffect(() => {
    handleSession().then(
      (result) => result.succeeded && onLoginSuccess(result.user)
    );
    // eslint-disable-next-line
  }, []);
  return (
    <LoginPage
      onLogin={async (values) => {
        const result = await handleLogin(values);
        if (result.succeeded) {
          onLoginSuccess(result.user);
        }
      }}
    />
  );
};

export default Page;
