import * as React from "react";
import Layout from "../shared/Layout";
import WaitingListForm from "./WaitingListForm";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { createWaitingList } from "./waitingListsReducer";

export type CreateWaitingListPageProps = {};

export const CreateWaitingListPage = (props: CreateWaitingListPageProps) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(
    (state) => state.waitingLists.createWaitingListFormError
  );

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
