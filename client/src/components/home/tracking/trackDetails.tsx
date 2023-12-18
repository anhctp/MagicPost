import { CheckBadgeIcon, ClockIcon, StarIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

const OrderDetails = ({isOpen, onClose }:{isOpen:any, onClose:any}) => {
    return (
        <>
            {isOpen && (
                <div className="bg-white border rounded-xl">
                    <div className="flex justify-between items-center p-2 ">
                        <h1 className="text-black text-xl font-semibold">Mã vận đơn:</h1>
                        <button className="backdrop" onClick={onClose}><XCircleIcon width={24} height={24} /></button>
                    </div>
                    <hr />
                    <div className="p-4">
                        <div className="flex justify-start items-center space-x-3">
                            <div>time</div>
                            <StarIcon width={16} height={16} />
                            <div>status</div>

                            {status === 'done' &&
                                <CheckBadgeIcon />
                            }
                        </div>
                        {}
                        <div className="flex justify-start items-center space-x-3 fill-gray">
                            <div>time</div>
                            <StarIcon width={16} height={16} />
                            <div>status</div>

                            {status === 'done' &&
                                <CheckBadgeIcon />
                            }
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default OrderDetails;