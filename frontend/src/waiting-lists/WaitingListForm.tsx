import * as React from "react";
import { FormikErrors, useFormik } from "formik";

interface WaitingListFormValues {
  name: string;
}

export type WaitingListFormProps = {
  error: string | undefined;
  onSubmit: (values: WaitingListFormValues) => void;
};

export const WaitingListForm = (props: WaitingListFormProps) => {
  const { error, onSubmit } = props;
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validate: (value) => {
      const result = {} as FormikErrors<WaitingListFormValues>;
      if (!value.name) {
        result.name = "表示名が未入力です。";
      }
      return result;
    },
    onSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      {error ? <p className="text-danger">{error}</p> : null}
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          表示名
        </label>
        <input
          className={"form-control " + (formik.errors.name ? "is-invalid" : "")}
          type="text"
          name="name"
          id="name"
          autoComplete="name"
          data-testid="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <div className="invalid-feedback">{formik.errors.name}</div>
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-primary btn-block">
          登録
        </button>
      </div>
    </form>
  );
};

export default WaitingListForm;
