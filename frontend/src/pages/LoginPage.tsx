import * as React from "react";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import { useAuthContext } from "../components/AuthContext";
import { Redirect, RouterProps } from "react-router";
import { login } from "../api";

export type LoginPageProps = {} & RouterProps;

export const LoginPage = (props: LoginPageProps) => {
  const { user, setUser } = useAuthContext();

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
      <LoginForm
        onSubmit={async (values) => {
          const result = await login(values);
          if (result.succeeded) {
            setUser(result.user);
          }
        }}
      />
    </Layout>
  );
};

export default LoginPage;
