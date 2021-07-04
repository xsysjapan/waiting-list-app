import * as React from "react";
import Layout from "../shared/Layout";
import WaitingListForm from "./WaitingListForm";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import {
  createWaitingList,
  createWaitingListFormMounted,
  createWaitingListFormUnmounted,
} from "./waitingListsReducer";
import { useHistory } from "react-router";

export type CreateWaitingListPageProps = {};

export const CreateWaitingListPage = (props: CreateWaitingListPageProps) => {
  const dispatch = useAppDispatch();
  const formState = useAppSelector(
    (state) => state.waitingLists.createWaitingListFormState
  );

  const router = useHistory();
  React.useEffect(() => {
    dispatch(createWaitingListFormMounted());
    return () => {
      dispatch(createWaitingListFormUnmounted());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (formState && formState.state === "SUCCEEDED") {
      router.push(`/waiting-lists`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  if (!formState) {
    return null;
  }

  return (
    <Layout>
      <h1>新規作成</h1>
      <WaitingListForm
        error={formState.error}
        onSubmit={(values) => dispatch(createWaitingList(values))}
      />
    </Layout>
  );
};

export default CreateWaitingListPage;
