import * as React from "react";
import { RouteComponentProps } from "react-router";
import { WaitingListDetails } from "../shared/types";
import Layout from "../shared/Layout";
import WaitingCustomerList from "../waiting-lists/WaitingCustomerList";

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

  return (
    <Layout>
      <div className="d-flex justify-content-between">
        <h1>{waitingList.name}</h1>
        <button className="btn btn-outline-dark">追加</button>
      </div>
      <div className="my-3">
        <h5>呼出中</h5>
        <WaitingCustomerList
          customers={waitingList.customers.filter(
            (e) => e.status === "CALLING"
          )}
          activeIds={activeIds}
          onActivate={onActivate}
          onDeactivate={onDeactivate}
          {...handlers}
        />
      </div>
      <div className="my-3">
        <h5>待ち</h5>
        <WaitingCustomerList
          customers={waitingList.customers.filter(
            (e) => e.status === "NOT_CALLED"
          )}
          activeIds={activeIds}
          onActivate={onActivate}
          onDeactivate={onDeactivate}
          {...handlers}
        />
      </div>
      <div className="my-3">
        <h5>受付済</h5>
        <WaitingCustomerList
          customers={waitingList.customers.filter(
            (e) => e.status === "ARRIVED"
          )}
          activeIds={activeIds}
          onActivate={onActivate}
          onDeactivate={onDeactivate}
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
      onCallClick={(id) => console.log(id)}
      onCancelCallClick={(id) => console.log(id)}
      onArriveClick={(id) => console.log(id)}
      onMoveUpTo={(id, before) => console.log(id, before)}
      onMoveDownTo={(id, after) => console.log(id, after)}
    />
  );
};

export default WaitingListDetailsPage;
