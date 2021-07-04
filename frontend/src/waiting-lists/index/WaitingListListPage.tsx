import * as React from "react";
import { Link } from "react-router-dom";
import { OperationState, WaitingListSummary } from "../../shared/types";
import Layout from "../../shared/Layout";
import WaitingListList from "./WaitingListList";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { getWaitingLists } from "../waitingListsReducer";

export type WaitingListListPageViewProps = {
  waitingListsStatus: OperationState;
  waitingLists: WaitingListSummary[] | undefined;
};

export const WaitingListListPageView = (
  props: WaitingListListPageViewProps
) => {
  const { waitingListsStatus, waitingLists } = props;
  const activeWaitingLists = React.useMemo(
    () => waitingLists!.filter((e) => e.active),
    [waitingLists]
  );
  const inactiveWaitingLists = React.useMemo(
    () => waitingLists!.filter((e) => !e.active),
    [waitingLists]
  );

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
        <div className="mb-2">
          <h5>Active</h5>
        </div>
        {activeWaitingLists.length > 0 ? (
          <WaitingListList waitingLists={activeWaitingLists} />
        ) : (
          <p>現在Activeな待ちリストはありません。</p>
        )}
      </div>
      <div className="my-3">
        <div className="mb-2">
          <h5>Inactive</h5>
        </div>
        {inactiveWaitingLists.length > 0 ? (
          <WaitingListList waitingLists={inactiveWaitingLists} />
        ) : (
          <p>現在Inactiveな待ちリストはありません。</p>
        )}
      </div>
    </Layout>
  );
};

export type WaitingListListPageProps = {};

export const WaitingListListPage = (props: WaitingListListPageProps) => {
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
    <WaitingListListPageView
      waitingListsStatus={getWaitingListsStatus}
      waitingLists={waitingLists}
    />
  );
};

export default WaitingListListPage;
