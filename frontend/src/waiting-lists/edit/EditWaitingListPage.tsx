import * as React from "react";
import { useHistory, useParams } from "react-router";
import Layout from "../../shared/Layout";
import WaitingListForm from "../shared/WaitingListForm";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import {
  editWaitingListName,
  editWaitingListFormMounted,
  editWaitingListFormUnmounted,
} from "../waitingListsReducer";

export type EditWaitingListPageProps = {};

export const EditWaitingListPage = (props: EditWaitingListPageProps) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const formState = useAppSelector(
    (state) => state.waitingLists.editWaitingListFormState[id]
  );
  const waitingListDetails = useAppSelector(
    (state) =>
      state.waitingLists.waitingListDetailsPageState[id]?.waitingListDetails
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
    return null;
  }

  return (
    <Layout>
      <h1>更新</h1>
      <WaitingListForm
        status={formState.status}
        error={formState.error}
        initialValue={waitingListDetails && { name: waitingListDetails.name }}
        onSubmit={(values) => dispatch(editWaitingListName({ ...values, id }))}
        onCancel={() => router.push(`/waiting-lists/${id}`)}
      />
    </Layout>
  );
};

export default EditWaitingListPage;
