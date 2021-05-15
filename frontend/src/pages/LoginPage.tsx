import * as React from "react";
import Layout from "../components/Layout";
import { User } from "../models";

export type LoginPageProps = {
  onUserLogin: (user: User) => void;
};

export const LoginPage = (props: LoginPageProps) => {
  return (
    <Layout>
      <h1>ログイン</h1>
    </Layout>
  );
};

export default LoginPage;
