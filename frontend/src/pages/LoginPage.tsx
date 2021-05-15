import * as React from "react";
import { LoginFormValues } from "../models";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";

export type LoginPageProps = {
  onLogin: (user: LoginFormValues) => void;
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

export default LoginPage;
