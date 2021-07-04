import * as React from "react";
import WaitingListCustomerForm from "./WaitingListCustomerForm";
import {
  createWaitingListCustomer,
  addWaitingListCustomerFormMounted,
  addWaitingListCustomerFormUnmounted,
} from "./waitingListsReducer";
import { useAppDispatch, useAppSelector } from "../shared/hooks";

export type AddWaitingListCustomerFormProps = {
  id: string;
  onComplete: () => void;
  onCancel: () => void;
};

export const AddWaitingListCustomerForm = (
  props: AddWaitingListCustomerFormProps
) => {
  const { id, onComplete, onCancel } = props;
  const dispatch = useAppDispatch();
  const formState = useAppSelector(
    (state) => state.waitingLists.addWaitingListCustomerFormState[id]
  );

  React.useEffect(() => {
    dispatch(addWaitingListCustomerFormMounted({ id }));
    return () => {
      dispatch(addWaitingListCustomerFormUnmounted({ id }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (formState && formState.state === "SUCCEEDED") {
      onComplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  if (!formState) {
    return null;
  }

  return (
    <WaitingListCustomerForm
      state={formState.state}
      error={formState.error}
      onSubmit={(values) =>
        dispatch(createWaitingListCustomer({ ...values, id }))
      }
      onCancel={onCancel}
    />
  );
};

export default AddWaitingListCustomerForm;
