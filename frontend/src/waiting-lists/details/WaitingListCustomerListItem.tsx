import * as React from "react";
import { WaitingListCustomer } from "../../shared/types";
import PassedTimeLabel from "./PassedTimeLabel";

export type WaitingListCustomerListItemProps = {
  customer: WaitingListCustomer;
  remaining?: number;
  active: boolean;
  isFirst: boolean;
  isLast: boolean;
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onCancelClick: (id: string) => void;
  onCallClick: (id: string) => void;
  onCancelCallClick: (id: string) => void;
  onArriveClick: (id: string) => void;
  onMoveUpClick: (id: string) => void;
  onMoveDownClick: (id: string) => void;
};

export const WaitingListCustomerListItem = (
  props: WaitingListCustomerListItemProps
) => {
  const {
    customer: e,
    remaining,
    active,
    isFirst,
    isLast,
    onActivate,
    onDeactivate,
    onCancelClick,
    onCallClick,
    onCancelCallClick,
    onArriveClick,
    onMoveUpClick,
    onMoveDownClick,
  } = props;
  return (
    <div
      key={e.id}
      className={`list-group-item list-group-item-action${
        active ? " active" : ""
      }`}
    >
      <div
        className="d-flex w-100 justify-content-between"
        onClick={() => (active ? onDeactivate(e.id) : onActivate(e.id))}
      >
        <h6 className="my-1">
          {e.name}
          {e.status === "CALLING" ? (
            <>
              {" "}
              <span className="ml-3 badge bg-warning text-dark">呼出中</span>
            </>
          ) : null}
        </h6>
        {e.status === "NOT_CALLED" ? (
          <>
            {" "}
            <small>{remaining === 1 ? "次" : `残り ${remaining}`}</small>
          </>
        ) : null}
        {e.status === "CALLING" ? (
          <>
            {" "}
            <PassedTimeLabel diffInSeconds={0} />
          </>
        ) : null}
      </div>
      {active ? (
        <div className="row mt-3">
          {e.status === "NOT_CALLED" ? (
            <>
              <div className="col-auto">
                <button
                  className="btn btn-sm btn-outline-light"
                  onClick={() => {
                    onCallClick(e.id);
                  }}
                >
                  呼出
                </button>
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-sm btn-outline-light"
                  onClick={() => {
                    onCancelClick(e.id);
                  }}
                >
                  キャンセル
                </button>
              </div>
            </>
          ) : null}
          {e.status === "CALLING" ? (
            <>
              <div className="col-auto">
                <button
                  className="btn btn-sm btn-outline-light"
                  onClick={() => {
                    onCallClick(e.id);
                  }}
                >
                  再呼出
                </button>
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-sm btn-outline-light"
                  onClick={() => {
                    onCancelCallClick(e.id);
                  }}
                >
                  呼出キャンセル
                </button>
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-sm btn-outline-light"
                  onClick={() => {
                    onArriveClick(e.id);
                  }}
                >
                  完了
                </button>
              </div>
            </>
          ) : null}
          {e.status === "ARRIVED" ? (
            <div className="col-auto">
              <button
                className="btn btn-sm btn-outline-light"
                onClick={() => {
                  onCallClick(e.id);
                }}
              >
                再呼出
              </button>
            </div>
          ) : null}
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

export default WaitingListCustomerListItem;
