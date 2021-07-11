import * as React from "react";
import { Route, Switch, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import {
  getWaitingListById,
  waitingListDetailsPageMounted,
  waitingListDetailsPageUnmounted,
} from "../waitingListsReducer";
import NotFoundPage from "../../404/NotFoundPage";
import WaitingListDetailsIndexPage from "./index/WaitingListDetailsIndexPage";
import EditWaitingListPage from "./edit/EditWaitingListPage";
import AddWaitingListCustomerPage from "./add-customer/AddWaitingListCustomerPage";
import EditWaitingListCustomerPage from "./edit-customer/EditWaitingListCustomerPage";
import LoadingPage from "./LoadingPage";

const RoutePage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { waitingListDetailsPageState } = useAppSelector(
    (state) => state.waitingLists
  );

  const dispatch = useAppDispatch();
  const onInitialize = () => {
    dispatch(waitingListDetailsPageMounted({ id }));
    dispatch(getWaitingListById({ id }));
    return () => {
      dispatch(waitingListDetailsPageUnmounted({ id }));
    };
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(onInitialize, []);

  if (
    !waitingListDetailsPageState[id] ||
    !waitingListDetailsPageState[id].waitingListDetails
  ) {
    return <LoadingPage />;
  }

  return (
    <Switch>
      <Route
        path="/waiting-lists/:id"
        exact
        render={() => (
          <WaitingListDetailsIndexPage
            id={id}
            waitingList={waitingListDetailsPageState[id].waitingListDetails!}
          />
        )}
      />
      <Route
        path="/waiting-lists/:id/edit"
        exact
        render={() => (
          <EditWaitingListPage
            id={id}
            waitingList={waitingListDetailsPageState[id].waitingListDetails!}
          />
        )}
      />
      <Route
        path="/waiting-lists/:id/customers/add"
        exact
        render={() => (
          <AddWaitingListCustomerPage
            id={id}
            waitingList={waitingListDetailsPageState[id].waitingListDetails!}
          />
        )}
      />
      <Route
        path="/waiting-lists/:id/customers/:customerId/edit"
        exact
        render={(props) => (
          <EditWaitingListCustomerPage
            id={id}
            customerId={props.match.params.customerId}
            waitingList={waitingListDetailsPageState[id].waitingListDetails!}
          />
        )}
      />
      <Route path="*" exact component={NotFoundPage} />
    </Switch>
  );
};

export default RoutePage;
