import useLocation from "@/hooks/useLocation";
import React, { useEffect } from "react";

interface Props {
  setLocationUserId: React.Dispatch<React.SetStateAction<number>>;
}

export const ModalLocation: React.FC<Props> = (props) => {
  const { setLocationUserId } = props;
  const {
    divisions,
    districts,
    wards,
    locationId,
    setDivisionId,
    setDistrictId,
    setWardId,
  } = useLocation();
  useEffect(() => {
    setLocationUserId(locationId);
  }, [locationId]);
  return (
    <div className="flex gap-2">
      <select
        className="w-1/3 border rounded-full"
        onChange={(e) => {
          setDivisionId(+e.target.value);
        }}
      >
        {divisions?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        className="w-1/3 border rounded-full"
        onChange={(e) => {
          setDistrictId(+e.target.value);
        }}
      >
        {districts?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        className="w-1/3 border rounded-full"
        onChange={(e) => {
          setWardId(+e.target.value);
        }}
      >
        {wards?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};
