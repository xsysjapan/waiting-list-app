import * as React from "react";
import Layout from "../shared/Layout";
import SmsMessagePanel from "./SmsMessagePanel";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import {
  getSmsMessageTemplate,
  putSmsMessageTemplate,
} from "./settingsReducer";

export type SettingsPageProps = {};

export const SettingsPage = (props: SettingsPageProps) => {
  const dispatch = useAppDispatch();
  const {
    getSmsMessageTemplateStatus,
    putSmsMessageTemplateStatus,
    putSmsMessageTemplateError,
    values,
  } = useAppSelector((state) => state.settings);
  React.useEffect(() => {
    dispatch(getSmsMessageTemplate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    getSmsMessageTemplateStatus === "UNSUBMITTED" ||
    getSmsMessageTemplateStatus === "LOADING"
  ) {
    return (
      <Layout>
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">読み込み中...</span>
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <h1>設定</h1>
      <div className="my-3">
        <SmsMessagePanel
          state={putSmsMessageTemplateStatus}
          error={putSmsMessageTemplateError}
          initialValue={{
            smsMessageTemplate: values.smsMessageTemplate || "",
          }}
          onSubmit={(values) => {
            dispatch(
              putSmsMessageTemplate({ value: values.smsMessageTemplate })
            );
          }}
        />
      </div>
    </Layout>
  );
};

export default SettingsPage;
