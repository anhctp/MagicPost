import { getLocationById, getTransactionById } from "@/services/staff/staffApi";
import { useEffect, useState } from "react";

const useReceipt = (id: number) => {
  const [transactions, setTransactions] = useState<any>();
  const [locationSender, setLocationSender] = useState<any>();
  const [locationReceiver, setLocationReceiver] = useState<any>();
  const transaction = async () => {
    if (id)
      await getTransactionById(id).then((response) => {
        setTransactions(response.data);
      });
    return id;
  };

  const location = async () => {
    if (transactions) {
      await getLocationById(transactions.sender.location_id).then(
        (response) => {
          const location = response.data;
          setLocationSender(
            (location.address ? location.address + ", " : "") +
              location.ward.name +
              ", " +
              location.district.name +
              ", " +
              location.division.name
          );
        }
      );
      await getLocationById(transactions.receiver.location_id).then(
        (response) => {
          const location = response.data;
          setLocationReceiver(
            (location.address ? location.address + ", " : "") +
              location.ward.name +
              ", " +
              location.district.name +
              ", " +
              location.division.name
          );
        }
      );
    }
  };

  useEffect(() => {
    transaction();
  }, [id]);

  useEffect(() => {
    location();
  }, [transactions]);

  return { transactions, locationSender, locationReceiver };
};

export default useReceipt;
