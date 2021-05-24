import * as React from "react";
import { Link } from "react-router-dom";

export type WaitingListProps = {
  waitings: {
    id: number;
    date: string;
    number: number;
    customer: { id: number; name: string; phoneNumber: string };
  }[];
};

export const WaitingList = (props: WaitingListProps) => {
  const { waitings } = props;
  return (
    <div className="list-group">
      {waitings.map((e) => {
        return (
          <Link
            key={e.id}
            to={`/waitings/${e.id}`}
            className="list-group-item list-group-item-action"
          >
            {e.customer.name}
          </Link>
        );
      })}
    </div>
  );
};

export default WaitingList;
