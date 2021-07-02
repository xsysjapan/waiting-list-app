import * as React from "react";
import Layout from "../shared/Layout";
import WaitingListCustomerForm from "./WaitingListCustomerForm";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import {
  createWaitingListCustomer,
  createWaitingListCustomerFormInitialized,
} from "./waitingListsReducer";
import { useHistory, useParams } from "react-router";

export type AddWaitingListCustomerPageProps = {};

export const AddWaitingListCustomerPage = (
  props: AddWaitingListCustomerPageProps
) => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const dispatch = useAppDispatch();
  const {
    createWaitingListCustomerFormStatus: status,
    createWaitingListCustomerFormError: error,
  } = useAppSelector((state) => state.waitingLists);
  
  const router = useHistory();
  React.useEffect(() => {
    if (status === "SUCCEEDED") {
      dispatch(createWaitingListCustomerFormInitialized());
      router.push(`/waiting-lists/${id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

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
