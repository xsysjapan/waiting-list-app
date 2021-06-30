import * as React from "react";
import { FormikErrors, useFormik } from "formik";

interface CreateWaitingListFormValues {
  name: string;
}

export type CreateWaitingListFormProps = {
  onSubmit: (values: CreateWaitingListFormValues) => void;
};

export const CreateWaitingListForm = (props: CreateWaitingListFormProps) => {
  const { onSubmit } = props;
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validate: (value) => {
      const result = {} as FormikErrors<CreateWaitingListFormValues>;
      if (!value.name) {
        result.name = "表示名が未入力です。";
      }
      return result;
    },
    onSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
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

export default CreateWaitingListForm;
