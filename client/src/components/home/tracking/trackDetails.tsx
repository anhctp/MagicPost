import {
  CheckBadgeIcon,
  ClockIcon,
  StarIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const OrderDetails = ({
  transaction,
  tracking,
}: {
  transaction: any;
  tracking: any[];
}) => {
  return (
    <div className=" w-[500px] bg-white border rounded-xl">
      <div className="flex justify-between items-center p-2 ">
        <h1 className="text-black text-xl font-semibold">
          Mã vận đơn: {transaction}
        </h1>
      </div>
      <hr />
      <div className="p-4 flex flex-col gap-4">
        {tracking.map((item) => (
          <div className="flex justify-start items-center space-x-3">
            <div>{item.time}</div>
            <StarIcon width={16} height={16} />
            <div>{item.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
