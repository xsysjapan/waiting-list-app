import * as React from "react";
import { Link } from "react-router-dom";
import { OperationStatus, WaitingListSummary } from "../shared/types";
import Layout from "../shared/Layout";
import WaitingListList from "./WaitingListList";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { getWaitingLists } from "./homeReducer";

export type HomePageViewProps = {
  waitingListsStatus: OperationStatus;
  waitingLists: WaitingListSummary[];
};

export const HomePageView = (props: HomePageViewProps) => {
  const { waitingListsStatus, waitingLists } = props;

  if (waitingListsStatus !== "SUCCEEDED" || !waitingLists) {
    return (
      <Layout>
        <div className="d-flex justify-content-between">
          <h1>待ちリスト</h1>
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
        <h1>待ちリスト</h1>
        <div>
          <Link to="/waiting-lists/create" className="btn btn-outline-dark">
            追加
          </Link>
        </div>
      </div>
      <div className="my-3">
        {waitingLists.length > 0 ? (
          <WaitingListList waitingLists={waitingLists} />
        ) : (
          <div>
            <p>現在Activeな待ちリストはありません。</p>
            <div>
              <Link to="/waiting-lists">待ちリスト一覧へ</Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export type HomePageProps = {};

export const HomePage = (props: HomePageProps) => {
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
    <HomePageView
      waitingListsStatus={getWaitingListsStatus}
      waitingLists={waitingLists}
    />
  );
};

export default HomePage;
