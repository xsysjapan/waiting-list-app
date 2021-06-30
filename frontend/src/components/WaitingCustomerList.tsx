import * as React from "react";

interface WaitingCustomerItem {
  id: string;
  name: string;
  status: "NOT_CALLED" | "CALLING" | "ARRIVED";
  mode: "NORMAL" | "ACTIVE";
}

export type WaitingCustomerListItemProps = {
  customer: WaitingCustomerItem;
  isFirst: boolean;
  isLast: boolean;
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onCallClick: (id: string) => void;
  onMoveUpClick: (id: string) => void;
  onMoveDownClick: (id: string) => void;
};

export const WaitingCustomerListItem = (
  props: WaitingCustomerListItemProps
) => {
  const {
    customer: e,
    isFirst,
    isLast,
    onDeactivate,
    onCallClick,
    onMoveUpClick,
    onMoveDownClick,
  } = props;
  return (
    <div
      key={e.id}
      className={`list-group-item list-group-item-action${
        e.mode === "ACTIVE" ? " active" : ""
      }`}
    >
      <p className="my-0" onClick={() => onDeactivate(e.id)}>
        {e.name}
        {e.status === "CALLING" ? (
          <>
            {" "}
            <span className="ml-3 badge bg-warning text-dark">呼出中</span>
          </>
        ) : null}
      </p>
      {e.mode === "ACTIVE" ? (
        <div className="row mt-3">
          <div className="col-auto">
            <button
              className="btn btn-sm btn-outline-light"
              onClick={(ev) => {
                ev.preventDefault();
                onCallClick(e.id);
              }}
            >
              呼出
            </button>
          </div>
          <div className="col-auto">
            <button
              className="col-auto btn btn-sm btn-outline-light"
              onClick={() => !isFirst && onMoveUpClick(e.id)}
              disabled={isFirst}
            >
              ↑ 前へ
            </button>
          </div>
          <div className="col-auto">
            <button
              className="col-auto btn btn-sm btn-outline-light"
              onClick={() => !isLast && onMoveDownClick(e.id)}
              disabled={isLast}
            >
              ↓ 次へ
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export type WaitingCustomerListProps = {
  customers: WaitingCustomerItem[];
  onActivate: WaitingCustomerListItemProps["onActivate"];
  onDeactivate: WaitingCustomerListItemProps["onDeactivate"];
  onCallClick: WaitingCustomerListItemProps["onCallClick"];
  onMoveUpTo: (id: string, before: string) => void;
  onMoveDownTo: (id: string, after: string) => void;
};

export const WaitingCustomerList = (props: WaitingCustomerListProps) => {
  const {
    customers,
    onActivate,
    onDeactivate,
    onCallClick,
    onMoveUpTo,
    onMoveDownTo,
  } = props;
  return (
    <div className="list-group">
      {customers.map((e, i) => (
        <WaitingCustomerListItem
          customer={e}
          isFirst={i === 0}
          isLast={i === customers.length - 1}
          onActivate={onActivate}
          onDeactivate={onDeactivate}
          onCallClick={onCallClick}
          onMoveUpClick={() => onMoveUpTo(e.id, customers[i - 1].id)}
          onMoveDownClick={() => onMoveDownTo(e.id, customers[i + 1].id)}
        />
      ))}
    </div>
  );
};

export default WaitingCustomerList;