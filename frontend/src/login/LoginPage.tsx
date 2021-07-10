import * as React from "react";
import Layout from "../shared/Layout";
import LoginForm from "./LoginForm";
import { Redirect, RouterProps } from "react-router";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { login } from "../shared/authReducer";

export type LoginPageProps = {} & RouterProps;

export const LoginPage = (props: LoginPageProps) => {
  const dispatch = useAppDispatch();
  const { status, error, user } = useAppSelector((state) => state.auth);

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
        status={status}
        error={error}
        onSubmit={(values) => dispatch(login(values))}
      />
    </Layout>
  );
};

export default LoginPage;
