import * as React from "react";
import { WaitingListCustomer } from "../../shared/types";
import WaitingListCustomerListItem, {
  WaitingListCustomerListItemProps,
} from "./WaitingListCustomerListItem";

export type WaitingListCustomerListProps = {
  customers: WaitingListCustomer[];
  activeIds: string[];
  onActivate: WaitingListCustomerListItemProps["onActivate"];
  onDeactivate: WaitingListCustomerListItemProps["onDeactivate"];
  onCancelClick: WaitingListCustomerListItemProps["onCancelClick"];
  onCallClick: WaitingListCustomerListItemProps["onCallClick"];
  onCancelCallClick: WaitingListCustomerListItemProps["onCancelCallClick"];
  onArriveClick: WaitingListCustomerListItemProps["onArriveClick"];
  onMoveUpTo: (id: string, before: string) => void;
  onMoveDownTo: (id: string, after: string) => void;
  onEditCustomerClick: WaitingListCustomerListItemProps["onEditCustomerClick"];
};

export const WaitingListCustomerList = (
  props: WaitingListCustomerListProps
) => {
  const {
    customers,
    activeIds,
    onActivate,
    onDeactivate,
    onCancelClick,
    onCallClick,
    onCancelCallClick,
    onArriveClick,
    onMoveUpTo,
    onMoveDownTo,
    onEditCustomerClick,
  } = props;
  const [expand, setExpand] = React.useState(false);
  let customerlist = customers;
  const shouldTruncate = !(expand || customers.length < 7);
  if (shouldTruncate) {
    customerlist = customerlist.filter((_, i) => i < 5);
  }
  return (
    <div className="list-group">
      {customerlist.map((e, i) => (
        <WaitingListCustomerListItem
          key={e.id}
          customer={e}
          number={i + 1}
          active={activeIds.includes(e.id)}
          isFirst={i === 0}
          isLast={i === customers.length - 1}
          onActivate={onActivate}
          onDeactivate={onDeactivate}
          onCancelClick={onCancelClick}
          onCallClick={onCallClick}
          onCancelCallClick={onCancelCallClick}
          onArriveClick={onArriveClick}
          onMoveUpClick={() => onMoveUpTo(e.id, customers[i - 1].id)}
          onMoveDownClick={() => onMoveDownTo(e.id, customers[i + 1].id)}
          onEditCustomerClick={onEditCustomerClick}
        />
      ))}
      {shouldTruncate ? (
        <div
          className="list-group-item list-group-item-action text-center text-primary"
          onClick={() => setExpand(true)}
        >
          ...
        </div>
      ) : null}
    </div>
  );
};

export default WaitingListCustomerList;
