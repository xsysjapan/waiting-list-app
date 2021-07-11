import * as React from "react";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import {
  editWaitingListName,
  editWaitingListFormMounted,
  editWaitingListFormUnmounted,
} from "../../waitingListsReducer";
import { WaitingListDetails } from "../../../shared/types";
import Layout from "../../../shared/Layout";
import LoadingPage from "../LoadingPage";
import WaitingListForm from "../../shared/WaitingListForm";

export type EditWaitingListPageProps = {
  id: string;
  waitingList: WaitingListDetails;
};

export const EditWaitingListPage = (props: EditWaitingListPageProps) => {
  const { id, waitingList } = props;
  const dispatch = useAppDispatch();
  const formState = useAppSelector(
    (state) => state.waitingLists.editWaitingListFormState[id]
  );

  const router = useHistory();
  React.useEffect(() => {
    dispatch(editWaitingListFormMounted({ id }));
    return () => {
      dispatch(editWaitingListFormUnmounted({ id }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (formState && formState.status === "SUCCEEDED") {
      router.push(`/waiting-lists`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  if (!formState) {
    return <LoadingPage />;
  }

  return (
    <Layout>
      <h1>更新</h1>
      <WaitingListForm
        status={formState.status}
        error={formState.error}
        initialValue={{ name: waitingList.name }}
        onSubmit={(values) => dispatch(editWaitingListName({ ...values, id }))}
        onCancel={() => router.push(`/waiting-lists/${id}`)}
      />
    </Layout>
  );
};

export default EditWaitingListPage;
