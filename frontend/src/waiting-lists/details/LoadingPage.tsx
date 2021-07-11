import * as React from "react";
import Layout from "../../shared/Layout";

export type LoadingPage = {};

export const AddWaitingListCustomerPage = (props: LoadingPage) => {
  return (
    <Layout>
      <div className="d-flex justify-content-center">
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">読み込み中...</span>
        </div>
      </div>
    </Layout>
  );
};

export default AddWaitingListCustomerPage;
