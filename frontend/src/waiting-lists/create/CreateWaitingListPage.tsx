import * as React from "react";
import Layout from "../../shared/Layout";
import LoadingPage from "../details/LoadingPage";
import WaitingListForm from "../shared/WaitingListForm";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import {
  createWaitingList,
  createWaitingListFormMounted,
  createWaitingListFormUnmounted,
  getDefaultWaitingListName,
} from "../waitingListsReducer";
import { useHistory } from "react-router";

export type CreateWaitingListPageProps = {};

export const CreateWaitingListPage = (props: CreateWaitingListPageProps) => {
  const dispatch = useAppDispatch();
  const {
    createWaitingListFormState: formState,
    getDefaultWaitingListNameStatus,
    defautlWaitingListName,
  } = useAppSelector((state) => state.waitingLists);

  const router = useHistory();
  React.useEffect(() => {
    dispatch(createWaitingListFormMounted());
    dispatch(getDefaultWaitingListName());
    return () => {
      dispatch(createWaitingListFormUnmounted());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (formState && formState.status === "SUCCEEDED") {
      router.push(`/waiting-lists/${formState.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  if (
    !formState ||
    getDefaultWaitingListNameStatus === "UNSUBMITTED" ||
    getDefaultWaitingListNameStatus === "LOADING"
  ) {
    return <LoadingPage />;
  }

  return (
    <Layout>
      <h1>新規作成</h1>
      <WaitingListForm
        status={formState.status}
        initialValue={{ name: defautlWaitingListName || "" }}
        error={formState.error}
        onSubmit={(values) => dispatch(createWaitingList(values))}
        onCancel={() => router.push(`/`)}
      />
    </Layout>
  );
};

export default CreateWaitingListPage;
