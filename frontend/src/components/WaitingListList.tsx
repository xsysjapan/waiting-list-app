import * as React from "react";
import { Link } from "react-router-dom";

interface WaitingListItem {
  id: string;
  name: string;
}

export type WaitingListListProps = {
  waitingLists: WaitingListItem[];
};

export const WaitingListList = (props: WaitingListListProps) => {
  const { waitingLists } = props;
  return (
    <div className="list-group">
      {waitingLists.map((e) => {
        return (
          <Link
            key={e.id}
            to={`/waiting-lists/${e.id}`}
            className="list-group-item list-group-item-action"
          >
            {e.name}
          </Link>
        );
      })}
    </div>
  );
};

export default WaitingListList;
