import * as React from "react";
import WaitingListCustomerForm from "../shared/WaitingListCustomerForm";
import {
  editWaitingListCustomer,
  editWaitingListCustomerFormMounted,
  editWaitingListCustomerFormUnmounted,
} from "../waitingListsReducer";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";

export type EditWaitingListCustomerFormProps = {
  id: string;
  customerId: string;
  onComplete: () => void;
  onCancel: () => void;
};

export const EditWaitingListCustomerForm = (
  props: EditWaitingListCustomerFormProps
) => {
  const { id, customerId, onComplete, onCancel } = props;
  const dispatch = useAppDispatch();
  const formState = useAppSelector(
    (state) =>
      state.waitingLists.editWaitingListCustomerFormState[`${id}:${customerId}`]
  );

  React.useEffect(() => {
    dispatch(editWaitingListCustomerFormMounted({ id, customerId }));
    return () => {
      dispatch(editWaitingListCustomerFormUnmounted({ id, customerId }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (formState && formState.status === "SUCCEEDED") {
      onComplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  if (!formState) {
    return null;
  }

  return (
    <WaitingListCustomerForm
      status={formState.status}
      error={formState.error}
      onSubmit={(values) =>
        dispatch(editWaitingListCustomer({ ...values, id, customerId }))
      }
      onCancel={onCancel}
    />
  );
};

export default EditWaitingListCustomerForm;
