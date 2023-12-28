import {
  createFullTransaction,
  getTransactionStatistic,
} from "@/services/staff/staffApi";
import { useEffect, useState } from "react";
import {
  Transaction,
  TransactionDetail,
} from "@/services/staff/transactionPointHelpers";

const useTransactionPoint = () => {
  const [receiveFromGathering, setReceiveFromGathering] = useState<any>([]);
  const [receiveFromCustomer, setReceiveFromCustomer] = useState<any>([]);
  const [sendToCustomer, setSendToCustomer] = useState<any>([]);
  const [sendToGathering, setSendToGathering] = useState<any>([]);
  const [newTransactionId, setNewTransactionId] = useState<
    number | undefined
  >();

  const createNewTransaction = async (
    transaction: Transaction,
    detail: TransactionDetail
  ) => {
    await createFullTransaction({
      transaction: transaction,
      detail: detail,
    })
      .then((value) => {
        setNewTransactionId(value.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTransactions = async () => {
    await getTransactionStatistic().then((response) => {
      setReceiveFromGathering(response.data.receive_from_gatherings);
      setReceiveFromCustomer(response.data.receives_from_customers);
      setSendToGathering(response.data.send_to_gatherings);
      setSendToCustomer(response.data.send_to_customers);
    });
  };

  useEffect(() => {
    getTransactions();
  }, []);
  return {
    receiveFromGathering,
    receiveFromCustomer,
    sendToCustomer,
    sendToGathering,
    newTransactionId,
    createNewTransaction,
    getTransactions,
  };
};

export default useTransactionPoint;
