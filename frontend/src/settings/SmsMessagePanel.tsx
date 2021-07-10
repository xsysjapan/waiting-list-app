import * as React from "react";
import { FormikErrors, useFormik } from "formik";
import { OperationStatus } from "../shared/types";

export interface SmsMessagePanelValues {
  smsMessageTemplate: string;
}

export type SmsMessagePanelProps = {
  state: OperationStatus;
  error: string | undefined;
  initialValue: SmsMessagePanelValues;
  onSubmit: (values: SmsMessagePanelValues) => void;
};

export const SmsMessagePanel = (props: SmsMessagePanelProps) => {
  const { state, initialValue, error, onSubmit } = props;
  const formik = useFormik({
    initialValues: initialValue,
    validate: (value) => {
      const result = {} as FormikErrors<SmsMessagePanelValues>;
      if (!value.smsMessageTemplate) {
        result.smsMessageTemplate = "メッセージが未入力です。";
      }
      return result;
    },
    onSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="card">
        <h5 className="card-header">SMS設定</h5>
        <div className="card-body">
          <h5 className="card-title">呼び出しメッセージ</h5>
          {error ? <p className="text-danger">{error}</p> : null}
          <div className="mb-3">
            <div className="form-group">
              <textarea
                className={
                  "form-control " +
                  (formik.touched.smsMessageTemplate &&
                  formik.errors.smsMessageTemplate
                    ? "is-invalid"
                    : "")
                }
                name="smsMessageTemplate"
                id="smsMessageTemplate"
                data-testid="smsMessageTemplate"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.smsMessageTemplate}
              ></textarea>
              <div className="invalid-feedback">
                {formik.errors.smsMessageTemplate}
              </div>
            </div>
            <div className="mt-3">
              <button
                className="btn btn-primary"
                disabled={state === "LOADING" || !formik.isValid}
              >
                登録
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SmsMessagePanel;
