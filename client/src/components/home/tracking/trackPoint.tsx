// components/AddressForm.js
import { useEffect, useState } from "react";
import axios from "axios";

const AddressForm = ({ isOpen, onClose }: { isOpen: any; onClose: any }) => {
  const [cities, setCities] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCityChange = (e: { target: { value: any } }) => {
    const selectedCityId = e.target.value;
    const selectedCity = cities.find((city) => city.Id === selectedCityId);

    setDistricts(selectedCity ? selectedCity.Districts : []);
    setWards([]);
  };

  const handleDistrictChange = (e: { target: { value: any } }) => {
    const selectedDistrictId = e.target.value;
    const selectedCityId = (document.getElementById("city") as HTMLInputElement)
      .value;
    const selectedCity = cities.find((city) => city.Id === selectedCityId);

    const selectedDistrict = selectedCity?.Districts.find(
      (district: { Id: any }) => district.Id === selectedDistrictId
    );
    setWards(selectedDistrict ? selectedDistrict.Wards : []);
  };

  return (
    <>
      {isOpen && (
        <div className="bg-white flex justify-center items-start p-2 space-x-5 h-20">
          <select className="border" id="city" onChange={handleCityChange}>
            <option value="0">Chọn tỉnh thành</option>
            {cities.map((city) => (
              <option key={city.Id} value={city.Id}>
                {city.Name}
              </option>
            ))}
          </select>

          <select
            className="border"
            id="district"
            onChange={handleDistrictChange}
          >
            <option value="1">Chọn quận huyện</option>
            {districts.map((district) => (
              <option key={district.Id} value={district.Id}>
                {district.Name}
              </option>
            ))}
          </select>

          <select className="border" id="ward">
            <option value="2">Chọn phường xã</option>
            {wards.map((ward) => (
              <option key={ward.Id} value={ward.Id}>
                {ward.Name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default AddressForm;
