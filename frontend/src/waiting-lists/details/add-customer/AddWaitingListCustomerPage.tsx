import * as React from "react";
import { WaitingListDetails } from "../../../shared/types";
import { useHistory } from "react-router";
import Layout from "../../../shared/Layout";
import AddWaitingListCustomerForm from "./AddWaitingListCustomerForm";

export type AddWaitingListCustomerPageProps = {
  id: string;
  waitingList: WaitingListDetails;
};

export const AddWaitingListCustomerPage = (
  props: AddWaitingListCustomerPageProps
) => {
  const { id } = props;
  const router = useHistory();

  return (
    <Layout>
      <h1>待ちリスト追加</h1>
      <AddWaitingListCustomerForm
        id={id}
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

export default AddWaitingListCustomerPage;
