import { getGatheringStatistic } from "@/services/staff/staffApi";
import { useEffect, useState } from "react";

const useGatheringPoint = () => {
  const [receiveFromGathering, setReceiveFromGathering] = useState<any>([]);
  const [receiveFromTransaction, setReceiveFromTransaction] = useState<any>([]);
  const [sendToGathering, setSendToGathering] = useState<any>([]);
  const [sendToTransaction, setSendToTransaction] = useState<any>([]);

  const getGatherings = async () => {
    await getGatheringStatistic().then((response) => {
      setReceiveFromGathering(response.data.receive_from_gatherings);
      setReceiveFromTransaction(response.data.receives_from_transactions);
      setSendToGathering(response.data.send_to_gatherings);
      setSendToTransaction(response.data.send_to_transactions);
    });
  };

  useEffect(() => {
    getGatherings();
  }, []);
  
  return {
    receiveFromGathering,
    receiveFromTransaction,
    sendToTransaction,
    sendToGathering,
    getGatherings,
  };
};

export default useGatheringPoint;
