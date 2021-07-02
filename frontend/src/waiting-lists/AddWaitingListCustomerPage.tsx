import * as React from "react";
import Layout from "../shared/Layout";
import WaitingListCustomerForm from "./WaitingListCustomerForm";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { createWaitingListCustomer } from "./waitingListsReducer";
import { RouteComponentProps } from "react-router";

export type AddWaitingListCustomerPageProps = {} & RouteComponentProps<{
  id: string;
}>;

export const AddWaitingListCustomerPage = (
  props: AddWaitingListCustomerPageProps
) => {
  const { match } = props;
  const id = match?.params?.id;
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
