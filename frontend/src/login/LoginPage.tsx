import * as React from "react";
import Layout from "../shared/Layout";
import LoginForm from "./LoginForm";
import { useAuthContext } from "../shared/AuthContext";
import { Redirect, RouterProps } from "react-router";
import api from "../shared/api";

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
          const result = await api.createSession({
            sessionCreationParams: values,
          });
          if (result.user) {
            setUser(result.user);
          }
        }}
      />
    </Layout>
  );
};

export default LoginPage;
