import * as React from "react";
import Layout from "../shared/Layout";
import WaitingListCustomerForm from "./WaitingListCustomerForm";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { createWaitingListCustomer } from "./waitingListsReducer";
import { useParams } from "react-router";

export type AddWaitingListCustomerPageProps = {};

export const AddWaitingListCustomerPage = (
  props: AddWaitingListCustomerPageProps
) => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const dispatch = useAppDispatch();
  const error = useAppSelector(
    (state) => state.waitingLists.createWaitingListCustomerFormError
  );

  return (
    <Layout>
      <h1>待ちリスト追加</h1>
      <WaitingListCustomerForm
        error={error}
        onSubmit={(values) =>
          dispatch(createWaitingListCustomer({ ...values, id }))
        }
      />
    </Layout>
  );
};

export default AddWaitingListCustomerPage;
