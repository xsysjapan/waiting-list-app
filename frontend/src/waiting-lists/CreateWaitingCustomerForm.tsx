import * as React from "react";
import { FormikErrors, useFormik } from "formik";

interface CreateWaitingCustomerFormValues {
  name: string;
  phoneNumber: string;
}

export type CreateWaitingCustomerFormProps = {
  onSubmit: (values: CreateWaitingCustomerFormValues) => void;
};

export const CreateWaitingCustomerForm = (
  props: CreateWaitingCustomerFormProps
) => {
  const { onSubmit } = props;
  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
    },
    validate: (value) => {
      const result = {} as FormikErrors<CreateWaitingCustomerFormValues>;
      if (!value.name) {
        result.name = "名前が未入力です。";
      }
      if (!value.phoneNumber) {
        result.phoneNumber = "電話番号が未入力です。";
      }
      return result;
    },
    onSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          名前
        </label>
        <input
          className={"form-control " + (formik.errors.name ? "is-invalid" : "")}
          type="text"
          name="name"
          id="name"
          data-testid="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <div className="invalid-feedback">{formik.errors.name}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="phoneNumber" className="form-label">
          電話番号
        </label>
        <input
          className={
            "form-control " + (formik.errors.phoneNumber ? "is-invalid" : "")
          }
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          data-testid="phoneNumber"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <div className="invalid-feedback">{formik.errors.phoneNumber}</div>
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-primary btn-block">
          登録
        </button>
      </div>
    </form>
  );
};

export default CreateWaitingCustomerForm;
