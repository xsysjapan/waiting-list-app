import * as React from "react";
import { Link } from "react-router-dom";
import { OperationState, WaitingListSummary } from "../shared/types";
import Layout from "../shared/Layout";
import WaitingListList from "../waiting-lists/WaitingListList";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { getWaitingLists } from "./waitingListsReducer";

export type WaitingListIndexPageViewProps = {
  waitingListsStatus: OperationState;
  waitingLists: WaitingListSummary[] | undefined;
};

export const WaitingListIndexPageView = (
  props: WaitingListIndexPageViewProps
) => {
  const { waitingListsStatus, waitingLists } = props;

  if (waitingListsStatus !== "SUCCEEDED") {
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
          <div className="d-flex justify-content-center">
            <div className="spinner-grow text-primary" role="status">
              <span className="visually-hidden">読み込み中...</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

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
        <WaitingListList waitingLists={waitingLists!} />
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
  let isInited = false;
  const onInitialize = () => {
    dispatch(getWaitingLists());
    // eslint-disable-next-line
    isInited = true;
    return;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(onInitialize, []);
  if (isInited) {
    return null;
  }
  return (
    <WaitingListIndexPageView
      waitingListsStatus={getWaitingListsStatus}
      waitingLists={waitingLists}
    />
  );
};

export default WaitingListIndexPage;
