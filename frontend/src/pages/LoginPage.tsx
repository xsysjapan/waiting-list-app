import * as React from "react";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import { useAuthContext } from "../components/AuthContext";
import { Redirect, RouterProps } from "react-router";

export type LoginPageProps = {} & RouterProps;

export const LoginPage = (props: LoginPageProps) => {
  const { login, user } = useAuthContext();

  if (user) {
    const search = props.history.location.search;
    const returnUrl = search
      ? new URLSearchParams(decodeURIComponent(search)).get("returnUrl")
      : "";
    return <Redirect to={returnUrl || "/"} />;
  }

  return (
    <Layout>
      <h1>ログイン</h1>
      <LoginForm onSubmit={(values) => login(values)} />
    </Layout>
  );
};

export default LoginPage;
