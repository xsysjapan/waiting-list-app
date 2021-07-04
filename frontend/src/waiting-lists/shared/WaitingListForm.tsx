import * as React from "react";
import { FormikErrors, useFormik } from "formik";
import { OperationState } from "../../shared/types";

interface WaitingListFormValues {
  name: string;
}

export type WaitingListFormProps = {
  state: OperationState;
  error: string | undefined;
  initialValue?: WaitingListFormValues;
  onSubmit: (values: WaitingListFormValues) => void;
  onCancel: () => void;
};

export const WaitingListForm = (props: WaitingListFormProps) => {
  const { state, error, initialValue, onSubmit, onCancel } = props;
  const formik = useFormik({
    initialValues: initialValue || {
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
          className={
            "form-control " +
            (formik.touched.name && formik.errors.name ? "is-invalid" : "")
          }
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

export default WaitingListForm;
