import {
  getAllDistrictByDivisionID,
  getAllDivision,
  getAllWardByDistrictID,
  getLocationByWardId,
} from "@/services/staff/staffApi";
import { useEffect, useState } from "react";

const useLocation = () => {
  const [divisions, setDivisions] = useState<any[]>();
  const [districts, setDistricts] = useState<any[]>();
  const [wards, setWards] = useState<any[]>();
  const [divisionId, setDivisionId] = useState<number>(1);
  const [districtId, setDistrictId] = useState<number>(1);
  const [wardId, setWardId] = useState<number>(1);
  const [locationId, setLocationId] = useState<number>(1);

  const getDivision = async () => {
    await getAllDivision()
      .then((value) => {
        setDivisions(value.data);
        setDivisionId(value.data[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDistrict = async () => {
    await getAllDistrictByDivisionID(divisionId)
      .then((value) => {
        setDistricts(value.data);
        setDistrictId(value.data[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getWard = async () => {
    await getAllWardByDistrictID(districtId)
      .then((value) => {
        setWards(value.data);
        setWardId(value.data[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getLocationByWard = async () => {
    await getLocationByWardId(wardId)
      .then((value) => {
        setLocationId(value.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDivision();
  }, []);

  useEffect(() => {
    getDistrict();
  }, [divisionId]);
  useEffect(() => {
    getWard();
  }, [districtId]);
  useEffect(() => {
    getLocationByWard();
  }, [wardId]);

  return {
    divisions,
    districts,
    wards,
    divisionId,
    districtId,
    wardId,
    locationId,
    setDivisionId,
    setDistrictId,
    setWardId,
  };
};

export default useLocation;
