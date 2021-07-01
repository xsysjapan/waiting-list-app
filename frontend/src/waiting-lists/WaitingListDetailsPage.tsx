import * as React from "react";
import { RouteComponentProps } from "react-router";
import Layout from "../shared/Layout";
import WaitingCustomerList from "../waiting-lists/WaitingCustomerList";

interface WaitingListCustomer {
  id: string;
  name: string;
  phoneNumber: string;
  status: "NOT_CALLED" | "CALLING" | "ARRIVED";
  mode: "NORMAL" | "ACTIVE";
}

interface WaitingListDetails {
  id: string;
  name: string;
  customers: WaitingListCustomer[];
}

export type WaitingListDetailsPageViewProps = {
  waitingList: WaitingListDetails;
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onCallClick: (id: string) => void;
  onCancelCallClick: (id: string) => void;
  onArriveClick: (id: string) => void;
  onMoveUpTo: (id: string, before: string) => void;
  onMoveDownTo: (id: string, after: string) => void;
};

export const WaitingListDetailsPageView = (
  props: WaitingListDetailsPageViewProps
) => {
  const { waitingList, ...handlers } = props;
  return (
    <Layout>
      <h1>{waitingList.name}</h1>
      <div className="my-3">
        <h5>呼出中</h5>
        <WaitingCustomerList
          customers={waitingList.customers.filter(
            (e) => e.status === "CALLING"
          )}
          {...handlers}
        />
      </div>
      <div className="my-3">
        <h5>待ち</h5>
        <WaitingCustomerList
          customers={waitingList.customers.filter(
            (e) => e.status === "NOT_CALLED"
          )}
          {...handlers}
        />
      </div>
      <div className="my-3">
        <h5>受付済</h5>
        <WaitingCustomerList
          customers={waitingList.customers.filter(
            (e) => e.status === "ARRIVED"
          )}
          {...handlers}
        />
      </div>
    </Layout>
  );
};

export type WaitingListDetailsPageProps = {} & RouteComponentProps<{
  id: string;
}>;

export const WaitingListDetailsPage = (props: WaitingListDetailsPageProps) => {
  return (
    <WaitingListDetailsPageView
      waitingList={{ id: "dummy", name: "Dummy", customers: [] }}
      onActivate={(id) => console.log(id)}
      onDeactivate={(id) => console.log(id)}
      onCallClick={(id) => console.log(id)}
      onCancelCallClick={(id) => console.log(id)}
      onArriveClick={(id) => console.log(id)}
      onMoveUpTo={(id, before) => console.log(id, before)}
      onMoveDownTo={(id, after) => console.log(id, after)}
    />
  );
};

export default WaitingListDetailsPage;
