import * as React from "react";
import { WaitingListSummary } from "../shared/types";
import Layout from "../shared/Layout";
import WaitingListList from "../waiting-lists/WaitingListList";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { createWaitingList, getWaitingLists } from "./waitingListsReducer";

export type WaitingListIndexPageViewProps = {
  waitingLists: WaitingListSummary[];
  onCreateClick: () => void;
};

export const WaitingListIndexPageView = (
  props: WaitingListIndexPageViewProps
) => {
  const { waitingLists, onCreateClick } = props;

  return (
    <Layout>
      <div className="d-flex justify-content-between">
        <h1>待ちリスト一覧</h1>
        <button className="btn btn-outline-dark" onClick={onCreateClick}>
          追加
        </button>
      </div>
      <div className="my-3">
        <WaitingListList waitingLists={waitingLists} />
      </div>
    </Layout>
  );
};

export type WaitingListIndexPageProps = {};

export const WaitingListIndexPage = (props: WaitingListIndexPageProps) => {
  const { waitingListsStatus, waitingLists } = useAppSelector(
    (state) => state.waitingLists
  );
  const dispatch = useAppDispatch();
  const onInitialize = () => {
    dispatch(getWaitingLists());
    return;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(onInitialize, []);
  if (waitingListsStatus === "UNSUBMITTED") {
    return null;
  }
  if (waitingListsStatus === "LOADING") {
    return null;
  }
  return (
    <WaitingListIndexPageView
      waitingLists={waitingLists}
      onCreateClick={() => dispatch(createWaitingList({ name: "" }))}
    />
  );
};

export default WaitingListIndexPage;
