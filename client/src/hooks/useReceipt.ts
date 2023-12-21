import { getLocationById, getTransactionById } from "@/services/staff/staffApi";
import { useEffect, useState } from "react";

const useReceipt = (id: number) => {
  const [data, setData] = useState<any>();
  const [locationSender, setLocationSender] = useState<any>();
  const [locationReceiver, setLocationReceiver] = useState<any>();
  const transaction = async () => {
    if (id)
      await getTransactionById(id).then((response) => {
        setData(response.data);
      });
    return id;
  };

  const location = async () => {
    if (data) {
      await getLocationById(data.sender.location_id).then((response) => {
        const location = response.data;
        setLocationSender(
          (location.address ? location.address + ", " : "") +
            location.ward.name +
            ", " +
            location.district.name +
            ", " +
            location.division.name
        );
      });
      await getLocationById(data.receiver.location_id).then((response) => {
        const location = response.data;
        setLocationReceiver(
          (location.address ? location.address + ", " : "") +
            location.ward.name +
            ", " +
            location.district.name +
            ", " +
            location.division.name
        );
      });
    }
  };

  useEffect(() => {
    transaction();
  }, [id]);

  useEffect(() => {
    location();
  }, [data]);

  return { data, locationSender, locationReceiver };
};

export default useReceipt;
