import * as React from "react";
import Layout from "../shared/Layout";
import WaitingListForm from "./WaitingListForm";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import {
  createWaitingList,
  createWaitingListFormInitialized,
} from "./waitingListsReducer";
import { useHistory } from "react-router";

export type CreateWaitingListPageProps = {};

export const CreateWaitingListPage = (props: CreateWaitingListPageProps) => {
  const dispatch = useAppDispatch();
  const {
    createWaitingListFormStatus: status,
    createWaitingListFormError: error,
  } = useAppSelector((state) => state.waitingLists);

  const router = useHistory();
  React.useEffect(() => {
    if (status === "SUCCEEDED") {
      dispatch(createWaitingListFormInitialized());
      router.push(`/waiting-lists`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <Layout>
      <h1>新規作成</h1>
      <WaitingListForm
        error={error}
        onSubmit={(values) => dispatch(createWaitingList(values))}
      />
    </Layout>
  );
};

export default CreateWaitingListPage;
