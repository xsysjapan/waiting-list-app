import * as React from "react";
import { Link } from "react-router-dom";
import { WaitingListSummary } from "../shared/types";
import Layout from "../shared/Layout";
import WaitingListList from "../waiting-lists/WaitingListList";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { getWaitingLists } from "./waitingListsReducer";

export type WaitingListIndexPageViewProps = {
  waitingLists: WaitingListSummary[];
};

export const WaitingListIndexPageView = (
  props: WaitingListIndexPageViewProps
) => {
  const { waitingLists } = props;

  return (
    <Layout>
      <div className="d-flex justify-content-between">
        <h1>待ちリスト一覧</h1>
        <div>
          <Link to="/waiting-lists/create" className="btn btn-outline-dark">
            追加
          </Link>
        </div>
      </div>
      <div className="my-3">
        <WaitingListList waitingLists={waitingLists} />
      </div>
    </Layout>
  );
};

export type WaitingListIndexPageProps = {};

export const WaitingListIndexPage = (props: WaitingListIndexPageProps) => {
  const { getWaitingListsStatus, waitingLists } = useAppSelector(
    (state) => state.waitingLists
  );
  const dispatch = useAppDispatch();
  const onInitialize = () => {
    dispatch(getWaitingLists());
    return;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(onInitialize, []);
  if (getWaitingListsStatus === "UNSUBMITTED") {
    return null;
  }
  if (getWaitingListsStatus === "LOADING") {
    return null;
  }
  if (getWaitingListsStatus === "FAILED") {
    return null;
  }
  return <WaitingListIndexPageView waitingLists={waitingLists} />;
};

export default WaitingListIndexPage;
