import * as React from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { OperationState, WaitingListDetails } from "../shared/types";
import Layout from "../shared/Layout";
import WaitingListCustomerList from "./WaitingListCustomerList";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import {
  callWaitingListCustomer,
  deleteWaitingList,
  deleteWaitingListCustomer,
  getWaitingListById,
  moveWaitingListCustomer,
  updateWaitingListCustomerCallingStatus,
} from "./waitingListsReducer";
import { WaitingListUpdateCallingStatusParamsStatusEnum } from "../shared/api/generated";

export type WaitingListDetailsPageViewProps = {
  waitingListStatus: OperationState;
  waitingList: WaitingListDetails | undefined;
  onDeleteClick: () => void;
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
  const { waitingList, onDeleteClick, ...handlers } = props;
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
        <div className="row">
          <div className="col-auto">
            <button
              className="btn btn-outline-danger"
              onClick={onDeleteClick}
              disabled={waitingList.customers.length > 0}
            >
              削除
            </button>
          </div>
          <div className="col-auto">
            <Link
              to={`/waiting-lists/${waitingList.id}/addCustomer`}
              className="btn btn-outline-dark"
            >
              追加
            </Link>
          </div>
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
  const {
    getWaitingListByIdStatus,
    waitingListDetails,
    deleteWaitingListState,
  } = useAppSelector((state) => state.waitingLists);
  const dispatch = useAppDispatch();
  const onInitialize = () => {
    dispatch(getWaitingListById(id));
    return;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(onInitialize, []);

  const router = useHistory();
  const onDeleteStatusChange = () => {
    if (deleteWaitingListState[id] === "SUCCEEDED") {
      router.push("/waiting-lists");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(onDeleteStatusChange, [deleteWaitingListState]);

  return (
    <WaitingListDetailsPageView
      waitingListStatus={getWaitingListByIdStatus}
      waitingList={waitingListDetails[id]}
      onDeleteClick={() => {
        dispatch(deleteWaitingList({ id }));
      }}
      onCancelClick={(customerId) => {
        dispatch(deleteWaitingListCustomer({ id, customerId }));
      }}
      onCallClick={(customerId) => {
        dispatch(callWaitingListCustomer({ id, customerId }));
      }}
      onCancelCallClick={(customerId) => {
        dispatch(
          updateWaitingListCustomerCallingStatus({
            id,
            customerId,
            status: WaitingListUpdateCallingStatusParamsStatusEnum.NotCalled,
          })
        );
      }}
      onArriveClick={(customerId) => {
        dispatch(
          updateWaitingListCustomerCallingStatus({
            id,
            customerId,
            status: WaitingListUpdateCallingStatusParamsStatusEnum.Arrived,
          })
        );
      }}
      onMoveUpTo={(customerId, before) => {
        dispatch(
          moveWaitingListCustomer({
            id,
            customerId,
            before,
          })
        );
      }}
      onMoveDownTo={(customerId, after) => {
        dispatch(
          moveWaitingListCustomer({
            id,
            customerId,
            after,
          })
        );
      }}
    />
  );
};

export default WaitingListDetailsPage;
