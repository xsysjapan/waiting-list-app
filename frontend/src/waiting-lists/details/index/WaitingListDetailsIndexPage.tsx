import * as React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { WaitingListDetails } from "../../../shared/types";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import Layout from "../../../shared/Layout";
import WaitingListCustomerList from "./WaitingListCustomerList";
import {
  callWaitingListCustomer,
  deleteWaitingList,
  deleteWaitingListCustomer,
  editWaitingListActive,
  moveWaitingListCustomer,
  updateWaitingListCustomerCallingStatus,
} from "../../waitingListsReducer";
import { WaitingListUpdateCallingStatusParamsStatusEnum } from "../../../shared/api/generated";

export type WaitingListDetailsIndexPageViewProps = {
  waitingList: WaitingListDetails;
  onActivateClick: () => void;
  onDeactivateClick: () => void;
  onDeleteClick: () => void;
  onCancelClick: (customerId: string) => void;
  onCallClick: (customerId: string) => void;
  onCancelCallClick: (customerId: string) => void;
  onArriveClick: (customerId: string) => void;
  onMoveUpTo: (customerId: string, before: string) => void;
  onMoveDownTo: (customerId: string, after: string) => void;
  onEditCustomerClick: (customerId: string) => void;
};

export const WaitingListDetailsIndexPageView = (
  props: WaitingListDetailsIndexPageViewProps
) => {
  const [activeIds, setActiveIds] = React.useState([] as string[]);
  const {
    waitingList,
    onActivateClick,
    onDeactivateClick,
    onDeleteClick,
    ...handlers
  } = props;
  const onActivateCustomer = (customerId: string) => setActiveIds([customerId]);
  const onDeactivateCustomer = (customerId: string) =>
    setActiveIds(activeIds.filter((e) => e !== customerId));
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

  return (
    <Layout>
      <div>
        {waitingList.active ? (
          <>
            <span className="badge bg-primary">Active</span>{" "}
          </>
        ) : (
          <>
            <span className="badge bg-secondary">Inactive</span>{" "}
          </>
        )}
      </div>
      <div className="d-md-flex justify-content-between">
        <h1 className="my-3">{waitingList.name}</h1>
        <div className="row d-flex justify-content-end my-3">
          <div className="col-auto">
            {waitingList.active ? (
              <button
                className="btn btn-outline-dark"
                onClick={() => onDeactivateClick()}
              >
                無効化
              </button>
            ) : (
              <button
                className="btn btn-outline-primary"
                onClick={() => onActivateClick()}
              >
                有効化
              </button>
            )}
          </div>
          <div className="col-auto">
            <Link
              to={`/waiting-lists/${waitingList.id}/edit`}
              className="btn btn-outline-dark"
            >
              編集
            </Link>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-outline-danger"
              onClick={onDeleteClick}
              disabled={waitingList.customers.length > 0}
            >
              削除
            </button>
          </div>
        </div>
      </div>
      {callingCustomers.length > 0 ? (
        <div className="my-3">
          <div className="mb-2">
            <h5>呼出中</h5>
          </div>
          <WaitingListCustomerList
            customers={callingCustomers}
            activeIds={activeIds}
            onActivate={onActivateCustomer}
            onDeactivate={onDeactivateCustomer}
            {...handlers}
          />
        </div>
      ) : null}
      <div className="my-3">
        <div className="mb-2 d-flex justify-content-between">
          <h5>待ち</h5>
          <div className="row">
            <div className="col-auto">
              <Link
                to={`/waiting-lists/${waitingList.id}/customers/add`}
                className="btn btn-outline-dark"
              >
                追加
              </Link>
            </div>
          </div>
        </div>
        {waitingCustomers.length > 0 ? (
          <WaitingListCustomerList
            customers={waitingCustomers}
            activeIds={activeIds}
            onActivate={onActivateCustomer}
            onDeactivate={onDeactivateCustomer}
            {...handlers}
          />
        ) : (
          <p>お待ちのお客様は登録されていません。</p>
        )}
      </div>
      {arrivedCustomers.length > 0 ? (
        <div className="my-3">
          <div className="mb-2">
            <h5>受付済</h5>
          </div>
          <WaitingListCustomerList
            customers={arrivedCustomers}
            activeIds={activeIds}
            onActivate={onActivateCustomer}
            onDeactivate={onDeactivateCustomer}
            {...handlers}
          />
        </div>
      ) : null}
    </Layout>
  );
};

export type WaitingListDetailsIndexPageProps = {
  id: string;
  waitingList: WaitingListDetails;
};

export const WaitingListDetailsIndexPage = (
  props: WaitingListDetailsIndexPageProps
) => {
  const { id, waitingList } = props;
  const dispatch = useAppDispatch();
  const { deleteWaitingListState } = useAppSelector(
    (state) => state.waitingLists
  );

  const router = useHistory();
  const onDeleteStatusChange = () => {
    if (deleteWaitingListState[id] === "SUCCEEDED") {
      router.push("/");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(onDeleteStatusChange, [deleteWaitingListState]);

  return (
    <WaitingListDetailsIndexPageView
      waitingList={waitingList}
      onActivateClick={() => {
        dispatch(editWaitingListActive({ id, active: true }));
      }}
      onDeactivateClick={() => {
        dispatch(editWaitingListActive({ id, active: false }));
      }}
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
      onEditCustomerClick={(customerId) => {
        router.push(`/waiting-lists/${id}/customers/${customerId}/edit`);
      }}
    />
  );
};

export default WaitingListDetailsIndexPage;
