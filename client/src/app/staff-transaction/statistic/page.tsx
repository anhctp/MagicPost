"use client";

import PieChartPlot from "@/components/pieChart";
import { getStatusQuantity } from "@/services/staff/staffApi";
import { colorsChart } from "@/services/staff/transactionPointHelpers";
import { useEffect, useState } from "react";

export default function StaffTransaction() {
  const [data, setData] = useState<any>([]);
  const fetchData = async () => {
    await getStatusQuantity()
      .then((value) => {
        setData([
          { name: "Thành công", value: value.data.success },
          { name: "Thất bại", value: value.data.not_success },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-stone-600 text-xl">
      <PieChartPlot colors={colorsChart} data={data} />
      Thống kê các hàng đã chuyển thành công và các hàng chuyển không thành
      công.
    </div>
  );
}
