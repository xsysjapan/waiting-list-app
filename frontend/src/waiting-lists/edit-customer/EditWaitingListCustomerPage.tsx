import * as React from "react";
import { useHistory, useParams } from "react-router";
import Layout from "../../shared/Layout";
import EditWaitingListCustomerForm from "./EditWaitingListCustomerForm";

export type EditWaitingListCustomerPageProps = {};

export const EditWaitingListCustomerPage = (
  props: EditWaitingListCustomerPageProps
) => {
  const { id, customerId } = useParams<{ id: string; customerId: string }>();
  const router = useHistory();

  return (
    <Layout>
      <h1>待ち情報変更</h1>
      <EditWaitingListCustomerForm
        id={id}
        customerId={customerId}
        onComplete={() => {
          router.push(`/waiting-lists/${id}`);
        }}
        onCancel={() => {
          router.push(`/waiting-lists/${id}`);
        }}
      />
    </Layout>
  );
};

export default EditWaitingListCustomerPage;
