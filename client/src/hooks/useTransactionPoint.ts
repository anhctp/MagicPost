import { getTransactionStatistic } from "@/services/staff/staffApi";
import { useEffect, useState } from "react";

const useTransactionPoint = () => {
  const [receiveFromGathering, setReceiveFromGathering] = useState<any>([]);
  const [receiveFromCustomer, setReceiveFromCustomer] = useState<any>([]);
  const [sendToCustomer, setSendToCustomer] = useState<any>([]);
  const [sendToGathering, setSendToGathering] = useState<any>([]);
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
  };
};

export default useTransactionPoint;
