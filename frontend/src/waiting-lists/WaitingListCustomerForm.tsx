import * as React from "react";
import { FormikErrors, useFormik } from "formik";
import { OperationState } from "../shared/types";

interface WaitingListCustomerFormValues {
  name: string;
  phoneNumber: string;
}

export type WaitingListCustomerFormProps = {
  state: OperationState;
  error: string | undefined;
  onSubmit: (values: WaitingListCustomerFormValues) => void;
  onCancel: () => void;
};

export const WaitingListCustomerForm = (
  props: WaitingListCustomerFormProps
) => {
  const { state, error, onSubmit, onCancel } = props;
  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
    },
    validate: (value) => {
      const result = {} as FormikErrors<WaitingListCustomerFormValues>;
      if (!value.name) {
        result.name = "名前が未入力です。";
      }
      if (!value.phoneNumber) {
        result.phoneNumber = "電話番号が未入力です。";
      } else if (!value.phoneNumber.match(/^(090|080|070)\d{8}$/g)) {
        result.phoneNumber = "携帯電話の番号をハイフン無しで入力してください。";
      }
      return result;
    },
    onSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      {error ? <p className="text-danger">{error}</p> : null}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          名前
        </label>
        <input
          className={
            "form-control " +
            (formik.touched.name && formik.errors.name ? "is-invalid" : "")
          }
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
            "form-control " +
            (formik.touched.phoneNumber && formik.errors.phoneNumber
              ? "is-invalid"
              : "")
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
        <div className="row">
          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={state === "LOADING" || !formik.isValid}
            >
              登録
            </button>
          </div>
          <div className="col-auto">
            <button
              type="button"
              className="btn btn-secodnary btn-block"
              onClick={() => onCancel()}
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default WaitingListCustomerForm;
