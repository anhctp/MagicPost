"use client";

import PieChartPlot from "@/components/pieChart";
import { getTypeQuantity } from "@/services/leader/leaderApi";
import { colorsChart } from "@/services/leader/leaderHelpers";
import { useEffect, useState } from "react";

export default function LeaderTransaction() {
  const [data, setData] = useState<any>([]);
  const fetchData = async () => {
    await getTypeQuantity()
      .then((value) => {
        setData([
          {
            name: "Gửi tới kho tập kết",
            value: value.data.send_to_gatherings.length,
          },
          {
            name: "Gửi tới khách hàng",
            value: value.data.send_to_customers.length,
          },
          {
            name: "Nhận từ kho tập kết",
            value: value.data.receives_from_gatherings.length,
          },
          {
            name: "Nhận từ khách hàng",
            value: value.data.receives_from_customers.length,
          },
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
      Thống kê toàn bộ lịch sử hàng gửi, nhận.
    </div>
  );
}
