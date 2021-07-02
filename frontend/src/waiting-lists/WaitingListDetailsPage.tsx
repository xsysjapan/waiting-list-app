import * as React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { OperationState, WaitingListDetails } from "../shared/types";
import Layout from "../shared/Layout";
import WaitingListCustomerList from "./WaitingListCustomerList";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import {
  deleteWaitingListCustomer,
  getWaitingListById,
} from "./waitingListsReducer";

export type WaitingListDetailsPageViewProps = {
  waitingListStatus: OperationState;
  waitingList: WaitingListDetails | undefined;
  onCancelClick: (id: string) => void;
  onCallClick: (id: string) => void;
  onCancelCallClick: (id: string) => void;
  onArriveClick: (id: string) => void;
  onMoveUpTo: (id: string, before: string) => void;
  onMoveDownTo: (id: string, after: string) => void;
};

export const WaitingListDetailsPageView = (
  props: WaitingListDetailsPageViewProps
) => {
  const [activeIds, setActiveIds] = React.useState([] as string[]);
  const { waitingList, ...handlers } = props;
  const onActivate = (id: string) => setActiveIds([id]);
  const onDeactivate = (id: string) =>
    setActiveIds(activeIds.filter((e) => e !== id));
  const callingCustomers = React.useMemo(
    () =>
      waitingList
        ? waitingList.customers.filter((e) => e.status === "CALLING")
        : [],
    [waitingList]
  );
  const waitingCustomers = React.useMemo(
    () =>
      waitingList
        ? waitingList.customers.filter((e) => e.status === "NOT_CALLED")
        : [],
    [waitingList]
  );
  const arrivedCustomers = React.useMemo(
    () =>
      waitingList
        ? waitingList.customers.filter((e) => e.status === "ARRIVED").reverse()
        : [],
    [waitingList]
  );

  if (!waitingList) {
    return (
      <Layout>
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">読み込み中...</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="d-flex justify-content-between">
        <h1>{waitingList.name}</h1>
        <div>
          <Link
            to={`/waiting-lists/${waitingList.id}/addCustomer`}
            className="btn btn-outline-dark"
          >
            追加
          </Link>
        </div>
      </div>
      {callingCustomers.length > 0 ? (
        <div className="my-3">
          <h5>呼出中</h5>
          <WaitingListCustomerList
            customers={callingCustomers}
            activeIds={activeIds}
            onActivate={onActivate}
            onDeactivate={onDeactivate}
            {...handlers}
          />
        </div>
      ) : null}
      <div className="my-3">
        <h5>待ち</h5>
        {waitingCustomers.length > 0 ? (
          <WaitingListCustomerList
            customers={waitingCustomers}
            activeIds={activeIds}
            onActivate={onActivate}
            onDeactivate={onDeactivate}
            {...handlers}
          />
        ) : (
          <p>お待ちのお客様は登録されていません。</p>
        )}
      </div>
      {arrivedCustomers.length > 0 ? (
        <div className="my-3">
          <h5>受付済</h5>
          <WaitingListCustomerList
            customers={arrivedCustomers}
            activeIds={activeIds}
            onActivate={onActivate}
            onDeactivate={onDeactivate}
            {...handlers}
          />
        </div>
      ) : null}
    </Layout>
  );
};

export type WaitingListDetailsPageProps = {};

export const WaitingListDetailsPage = (props: WaitingListDetailsPageProps) => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { getWaitingListByIdStatus, waitingList } = useAppSelector(
    (state) => state.waitingLists
  );
  const dispatch = useAppDispatch();
  const onInitialize = () => {
    dispatch(getWaitingListById(id));
    return;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(onInitialize, []);

  return (
    <WaitingListDetailsPageView
      waitingListStatus={getWaitingListByIdStatus}
      waitingList={waitingList}
      onCancelClick={(customerId) =>
        dispatch(deleteWaitingListCustomer({ id, customerId }))
      }
      onCallClick={(id) => console.log(id)}
      onCancelCallClick={(id) => console.log(id)}
      onArriveClick={(id) => console.log(id)}
      onMoveUpTo={(id, before) => console.log(id, before)}
      onMoveDownTo={(id, after) => console.log(id, after)}
    />
  );
};

export default WaitingListDetailsPage;