import * as React from "react";
import Layout from "../shared/Layout";
import AddWaitingListCustomerForm from "./AddWaitingListCustomerForm";
import { useHistory, useParams } from "react-router";

export type AddWaitingListCustomerPageProps = {};

export const AddWaitingListCustomerPage = (
  props: AddWaitingListCustomerPageProps
) => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useHistory();

  return (
    <Layout>
      <h1>待ちリスト追加</h1>
      <AddWaitingListCustomerForm
        id={id}
        onComplete={() => {
          router.push(`/waiting-lists/${id}`);
        }}
      />
    </Layout>
  );
};

export default AddWaitingListCustomerPage;
