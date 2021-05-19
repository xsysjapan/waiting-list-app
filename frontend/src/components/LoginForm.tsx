import * as React from "react";
import { FormikErrors, useFormik } from "formik";
import { LoginFormValues } from "../models";

export type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => void;
};

export const LoginForm = (props: LoginFormProps) => {
  const { onSubmit } = props;
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (value) => {
      const result = {} as FormikErrors<LoginFormValues>;
      if (!value.username) {
        result.username = "ユーザー名が未入力です。";
      }
      if (!value.password) {
        result.password = "パスワードが未入力です。";
      }
      return result;
    },
    onSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          ユーザー名
        </label>
        <input
          className={
            "form-control " + (formik.errors.username ? "is-invalid" : "")
          }
          type="text"
          name="username"
          id="username"
          autoComplete="username"
          data-testid="username"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <div className="invalid-feedback">{formik.errors.username}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          パスワード
        </label>
        <input
          className={
            "form-control " + (formik.errors.password ? "is-invalid" : "")
          }
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          data-testid="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <div className="invalid-feedback">{formik.errors.password}</div>
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-primary btn-block">ログイン</button>
      </div>
    </form>
  );
};

export default LoginForm;
