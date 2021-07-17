import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  OperationStatus,
  PagedList,
  WaitingListSummary,
} from "../../shared/types";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { getWaitingLists } from "../waitingListsReducer";
import Layout from "../../shared/Layout";
import WaitingListList from "./WaitingListList";
import Pager from "../../shared/Pager";

export type WaitingListListPageViewProps = {
  waitingListsStatus: OperationStatus;
  waitingLists: PagedList<WaitingListSummary> | undefined;
};

export const WaitingListListPageView = (
  props: WaitingListListPageViewProps
) => {
  const { waitingListsStatus, waitingLists } = props;

  if (waitingListsStatus !== "SUCCEEDED" || !waitingLists) {
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
        {waitingLists.list.length > 0 ? (
          <div>
            <div className="my-3">
              <WaitingListList waitingLists={waitingLists.list} />
            </div>
            <Pager
              url="/waiting-lists"
              totalCount={waitingLists.totalCount}
              page={waitingLists.page}
              perPage={waitingLists.perPage}
            />
          </div>
        ) : (
          <p>待ちリストはありません。</p>
        )}
      </div>
    </Layout>
  );
};

export type WaitingListListPageProps = {};

export const WaitingListListPage = (props: WaitingListListPageProps) => {
  const router = useHistory();
  const { page, perPage } = React.useMemo(() => {
    if (router && router.location && router.location.search) {
      console.log(router.location);
      const params = new URLSearchParams(router.location.search);
      const page = Number(params.get("page"));
      const perPage = Number(params.get("perPage"));
      return {
        page: page || 1,
        perPage: perPage || 10,
      };
    }
    return {
      page: 1,
      perPage: 10,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.location?.search]);

  const { getWaitingListsStatus, pagedWaitingList } = useAppSelector(
    (state) => state.waitingLists
  );
  const dispatch = useAppDispatch();
  const onInitialize = () => {
    dispatch(getWaitingLists({ page, perPage }));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(onInitialize, [page, perPage]);
  return (
    <WaitingListListPageView
      waitingListsStatus={getWaitingListsStatus}
      waitingLists={pagedWaitingList}
    />
  );
};

export default WaitingListListPage;
