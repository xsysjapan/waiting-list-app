import * as React from "react";
import { useHistory } from "react-router";
import { WaitingListDetails } from "../../../shared/types";
import NotFoundPage from "../../../404/NotFoundPage";
import Layout from "../../../shared/Layout";
import EditWaitingListCustomerForm from "./EditWaitingListCustomerForm";

export type EditWaitingListCustomerPageProps = {
  id: string;
  customerId: string;
  waitingList: WaitingListDetails;
};

export const EditWaitingListCustomerPage = (
  props: EditWaitingListCustomerPageProps
) => {
  const { id, customerId, waitingList } = props;
  const customer = React.useMemo(
    () => waitingList.customers.filter((e) => e.id === customerId)[0],
    [waitingList, customerId]
  );
  const router = useHistory();

  if (!customer) {
    return <NotFoundPage />;
  }

  return (
    <Layout>
      <h1>待ち情報変更</h1>
      <EditWaitingListCustomerForm
        id={id}
        customerId={customerId}
        initialValue={{
          name: customer.name,
          phoneNumber: customer.phoneNumber,
          remarks: customer.remarks || "",
        }}
        onComplete={() => {
          router.push(`/waiting-lists/${id}`);
        }}
        onCancel={() => {
          router.push(`/waiting-lists/${id}`);
        }}
      />
    </Layout>
  );
};

export default EditWaitingListCustomerPage;
