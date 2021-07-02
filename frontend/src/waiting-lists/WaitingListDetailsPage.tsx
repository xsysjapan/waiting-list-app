import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { WaitingListDetails } from "../shared/types";
import Layout from "../shared/Layout";
import WaitingListCustomerList from "./WaitingListCustomerList";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { getWaitingListById } from "./waitingListsReducer";

export type WaitingListDetailsPageViewProps = {
  waitingList: WaitingListDetails;
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
    () => waitingList.customers.filter((e) => e.status === "CALLING"),
    [waitingList.customers]
  );
  const waitingCustomers = React.useMemo(
    () => waitingList.customers.filter((e) => e.status === "NOT_CALLED"),
    [waitingList.customers]
  );
  const arrivedCustomers = React.useMemo(
    () => waitingList.customers.filter((e) => e.status === "ARRIVED").reverse(),
    [waitingList.customers]
  );

  return (
    <Layout>
      <div className="d-flex justify-content-between">
        <h1>{waitingList.name}</h1>
        <Link
          to={`/waiting-lists/${waitingList.id}/addCustomer`}
          className="btn btn-outline-dark"
        >
          追加
        </Link>
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

export type WaitingListDetailsPageProps = {} & RouteComponentProps<{
  id: string;
}>;

export const WaitingListDetailsPage = (props: WaitingListDetailsPageProps) => {
  const { match } = props;
  const id = match?.params?.id;
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
  if (getWaitingListByIdStatus === "UNSUBMITTED") {
    return null;
  }
  if (getWaitingListByIdStatus === "LOADING") {
    return null;
  }
  if (getWaitingListByIdStatus === "FAILED") {
    return null;
  }
  return (
    <WaitingListDetailsPageView
      waitingList={waitingList!}
      onCallClick={(id) => console.log(id)}
      onCancelCallClick={(id) => console.log(id)}
      onArriveClick={(id) => console.log(id)}
      onMoveUpTo={(id, before) => console.log(id, before)}
      onMoveDownTo={(id, after) => console.log(id, after)}
    />
  );
};

export default WaitingListDetailsPage;
