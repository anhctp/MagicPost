import React, { useEffect, useState } from "react";
import { PrinterIcon } from "@heroicons/react/24/outline";
import ReactToPrint from "react-to-print";
import {
  CustomerInfo,
  ItemReturn,
  ItemType,
  TransactionDetail,
} from "@/services/staff/transactionPointHelpers";
import useTransactionPoint from "@/hooks/useTransactionPoint";
import { ModalLocation } from "../modalLocation";

interface CreateProps {
  setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ModalDetailProps {
  setOpenDetail: React.Dispatch<React.SetStateAction<number | null>>;
  componentRef: React.RefObject<HTMLDivElement> | undefined;
  transactions: any;
  locationSender: any;
  locationReceiver: any;
}

export const ModalCreateTransaction: React.FC<CreateProps> = (props) => {
  const { setOpenModel } = props;
  const { createNewTransaction } = useTransactionPoint();
  const [selectedType, setSelectedType] = useState<string>(ItemType.GOODS);
  const [selectedReturn, setSelectedReturn] = useState<string>(
    ItemReturn.RETURN
  );
  const [senderLocationId, setSenderLocationId] = useState<number>(1);
  const [receiverLocationId, setReceiverLocationId] = useState<number>(1);
  const [senderInfo, setSenderInfo] = useState<CustomerInfo>({
    fullname: "",
    phone: "",
    location_id: senderLocationId,
  });
  const [receiverInfo, setReceiverInfo] = useState<CustomerInfo>({
    fullname: "",
    phone: "",
    location_id: receiverLocationId,
  });
  const [transactionDetail, setTransactionDetail] = useState<TransactionDetail>(
    {
      item_type: selectedType,
      item_description: "",
      item_quantity: 1,
      item_weight: 0,
      item_value: 0,
      item_attached: "",
      item_return: selectedReturn,
      cod: 0,
      other_revenue: 0,
    }
  );

  const handleCreateTransaction = async () => {
    await createNewTransaction(
      {
        sender_info: senderInfo,
        receiver_info: receiverInfo,
        transaction_send_date: new Date().toISOString().split("T")[0],
        transaction_receive_date: new Date().toISOString().split("T")[0],
      },
      transactionDetail
    );
    setOpenModel(false);
  };
  const styles = {
    key: "font-medium italic",
    value: "font-light italic",
  };
  useEffect(() => {
    setSenderInfo((prevInfor) => ({
      ...prevInfor,
      location_id: senderLocationId,
    }));
  }, [senderLocationId]);
  useEffect(() => {
    setReceiverInfo((prevInfor) => ({
      ...prevInfor,
      location_id: receiverLocationId,
    }));
  }, [receiverLocationId]);
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray">
              <h3 className="text-3xl font-medium">Tạo đơn hàng</h3>
              <div
                className="text-3xl cursor-pointer"
                onClick={() => setOpenModel(false)}
              >
                ×
              </div>
            </div>
            {/*body*/}
            <div className="relative p-6 flex flex-col gap-3 text-xl">
              <div>
                1. Thông tin người gửi
                <div className="px-10">
                  <div className="text-base py-2">
                    <span className={styles.key}>Tên người gửi: </span>
                    <input
                      className={`${styles.value} border-b`}
                      value={senderInfo.fullname}
                      onChange={(e) => {
                        setSenderInfo((prevInfor) => ({
                          ...prevInfor,
                          fullname: e.target.value,
                        }));
                      }}
                    ></input>
                  </div>
                  <div className="text-base py-2">
                    <span className={styles.key}>Số điện thoại: </span>
                    <input
                      className={`${styles.value} border-b`}
                      value={senderInfo.phone}
                      onChange={(e) => {
                        setSenderInfo((prevInfor) => ({
                          ...prevInfor,
                          phone: e.target.value,
                        }));
                      }}
                    ></input>
                  </div>
                  <div className="text-base flex gap-2">
                    <span className={`${styles.key} h-fit flex shrink-0`}>
                      Địa chỉ:{" "}
                    </span>
                    <ModalLocation setLocationUserId={setSenderLocationId} />
                  </div>
                </div>
              </div>
              <div>
                2. Thông tin người nhận
                <div className="px-10">
                  <div className="text-base py-2">
                    <span className={styles.key}>Tên người nhận: </span>
                    <input
                      className={`${styles.value} border-b`}
                      value={receiverInfo.fullname}
                      onChange={(e) => {
                        setReceiverInfo((prevInfor) => ({
                          ...prevInfor,
                          fullname: e.target.value,
                        }));
                      }}
                    ></input>
                  </div>
                  <div className="text-base  py-2">
                    <span className={styles.key}>Số điện thoại: </span>
                    <input
                      className={`${styles.value} border-b`}
                      value={receiverInfo.phone}
                      onChange={(e) => {
                        setReceiverInfo((prevInfor) => ({
                          ...prevInfor,
                          phone: e.target.value,
                        }));
                      }}
                    ></input>
                  </div>
                  <div className="text-base flex gap-2">
                    <span className={`${styles.key} h-fit flex shrink-0`}>
                      Địa chỉ:{" "}
                    </span>
                    <ModalLocation setLocationUserId={setReceiverLocationId} />
                  </div>
                </div>
              </div>

              <div>
                3. Thông tin đơn hàng
                <div className="px-10">
                  <div className="flex gap-4 text-base">
                    <span className={styles.key}>Loại hàng gửi: </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedType === ItemType.DOCUMENTS}
                        onChange={() => setSelectedType(ItemType.DOCUMENTS)}
                      />
                      <p>Tài liệu</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedType === ItemType.GOODS}
                        onChange={() => setSelectedType(ItemType.GOODS)}
                      />
                      <p>Hàng hóa</p>
                    </div>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Chi tiết: </span>
                    <div className={`${styles.value} px-4 flex gap-2`}>
                      {" "}
                      <label htmlFor="quantity">Số lượng:</label>
                      <input
                        type="number"
                        id="quantity"
                        value={transactionDetail.item_quantity}
                        onChange={(e) => {
                          setTransactionDetail((prev) => ({
                            ...prev,
                            item_quantity: +e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className={`${styles.value} px-4 flex gap-2`}>
                      {" "}
                      <label htmlFor="weight">Khối lượng:</label>
                      <input
                        type="number"
                        id="weight"
                        value={transactionDetail.item_weight}
                        onChange={(e) => {
                          setTransactionDetail((prev) => ({
                            ...prev,
                            item_weight: +e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className={`${styles.value} px-4 flex gap-2`}>
                      {" "}
                      <label htmlFor="value">Trị giá:</label>
                      <input
                        type="number"
                        id="value"
                        value={transactionDetail.item_value}
                        onChange={(e) => {
                          setTransactionDetail((prev) => ({
                            ...prev,
                            item_value: +e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className={`${styles.value} px-4 flex gap-2`}>
                      {" "}
                      <label htmlFor="attached">Giấy tờ đính kèm:</label>
                      <input
                        type="text"
                        id="attached"
                        value={transactionDetail.item_attached}
                        onChange={(e) => {
                          setTransactionDetail((prev) => ({
                            ...prev,
                            item_attached: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className={`${styles.value} px-4 flex gap-2`}>
                      {" "}
                      <label htmlFor="cod">Cod:</label>
                      <input
                        type="number"
                        id="cod"
                        value={transactionDetail.cod}
                        onChange={(e) => {
                          setTransactionDetail((prev) => ({
                            ...prev,
                            cod: +e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className={`${styles.value} px-4 flex gap-2`}>
                      {" "}
                      <label htmlFor="other_revenue">Thu khác:</label>
                      <input
                        type="number"
                        id="other_revenue"
                        value={transactionDetail.other_revenue}
                        onChange={(e) => {
                          setTransactionDetail((prev) => ({
                            ...prev,
                            other_revenue: +e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className={`${styles.value} px-4 flex gap-2`}>
                      {" "}
                      <label htmlFor="description">Dịch vụ đặc biệt:</label>
                      <input
                        type="text"
                        id="description"
                        value={transactionDetail.item_description}
                        onChange={(e) => {
                          setTransactionDetail((prev) => ({
                            ...prev,
                            item_description: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Hàng không gửi được:
                      <div className="flex justify-between px-4">
                        <div className="flex gap-2">
                          <input
                            type="checkbox"
                            id="return"
                            checked={selectedReturn === ItemReturn.RETURN}
                            onChange={() =>
                              setSelectedReturn(ItemReturn.RETURN)
                            }
                          />
                          <label htmlFor="return">Chuyển hoàn ngay</label>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="checkbox"
                            id="call_sender"
                            checked={selectedReturn === ItemReturn.CALL_SENDER}
                            onChange={() =>
                              setSelectedReturn(ItemReturn.CALL_SENDER)
                            }
                          />
                          <label htmlFor="call_sender">Gọi cho người gửi</label>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="checkbox"
                            id="cancel"
                            checked={selectedReturn === ItemReturn.CANCEL}
                            onChange={() =>
                              setSelectedReturn(ItemReturn.CANCEL)
                            }
                          />
                          <label htmlFor="cancel">Huỷ</label>
                        </div>
                      </div>
                      <div className="flex gap-2 px-4">
                        <input
                          type="checkbox"
                          id="return_expiration"
                          checked={
                            selectedReturn === ItemReturn.RETURN_EXPIRATION
                          }
                          onChange={() =>
                            setSelectedReturn(ItemReturn.RETURN_EXPIRATION)
                          }
                        />
                        <label htmlFor="return_expiration">
                          Chuyển hoàn khi hết thời gian lưu trữ
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setOpenModel(false)}
              >
                Đóng
              </button>
              <button
                className="bg-neutral-400 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleCreateTransaction}
              >
                Tạo đơn hàng mới
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
export const ModalDetail: React.FC<ModalDetailProps> = (props) => {
  const { setOpenDetail, transactions, locationSender, locationReceiver } =
    props;
  const styles = {
    key: "font-medium italic",
    value: "font-light italic",
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray">
              <h3 className="text-3xl font-medium">Chi tiết đơn hàng</h3>
              <div
                className="text-3xl cursor-pointer"
                onClick={() => setOpenDetail(null)}
              >
                ×
              </div>
            </div>
            {/*body*/}
            <div className="relative p-6 flex flex-col gap-3 text-xl">
              <div>
                Mã đơn hàng:{" "}
                <span className="font-medium">{transactions?.code}</span>
              </div>
              <div>
                Thông tin nhân viên
                <div className="px-10">
                  <div className="text-base">
                    <span className={styles.key}>Họ và tên: </span>
                    <span className={styles.value}>
                      {transactions?.user.fullname}
                    </span>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Giới tính: </span>
                    <span className={styles.value}>
                      {transactions?.user.gender}
                    </span>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Số điện thoại: </span>
                    <span className={styles.value}>
                      {transactions?.user.phone}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                Thông tin người gửi
                <div className="px-10">
                  <div className="text-base">
                    <span className={styles.key}>Họ và tên: </span>
                    <span className={styles.value}>
                      {transactions?.sender.fullname}
                    </span>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Số điện thoại: </span>
                    <span className={styles.value}>
                      {transactions?.sender.phone}
                    </span>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Địa chỉ người gửi: </span>
                    <span className={styles.value}>{locationSender}</span>
                  </div>
                </div>
              </div>
              <div>
                Thông tin người nhận
                <div className="px-10">
                  <div className="text-base">
                    <span className={styles.key}>Họ và tên: </span>
                    <span className={styles.value}>
                      {transactions?.receiver.fullname}
                    </span>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Số điện thoại: </span>
                    <span className={styles.value}>
                      {transactions?.receiver.phone}
                    </span>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Địa chỉ người nhận: </span>
                    <span className={styles.value}>{locationReceiver}</span>
                  </div>
                </div>
              </div>
              <div>
                Thông tin đơn hàng
                <div className="px-10">
                  <div className="text-base">
                    <span className={styles.key}>Loại hàng gửi: </span>
                    <span className={styles.value}>
                      {transactions?.detail.item_type === "documents"
                        ? "Tài liệu"
                        : "Hàng hoá"}
                    </span>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Chi tiết: </span>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Số lượng: {transactions?.detail.item_quantity}
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Khối lượng: {transactions?.detail.item_weight}
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Trị giá: {transactions?.detail.item_value}
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Giấy tờ đính kèm:{" "}
                      {transactions?.detail.item_attached
                        ? transactions.detail.item_attached
                        : "Không có"}
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Dịch vụ đặc biệt:{" "}
                      {transactions?.detail.item_description
                        ? transactions.detail.item_description
                        : "Không có"}
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Hàng không gửi được: {transactions?.detail.item_return}
                    </div>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Cước: </span>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Cước chính: {transactions?.charge.detail.base}đ
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Phụ phí: {transactions?.charge.detail.surcharge}đ
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Cước GTGT: {transactions?.charge.detail.vat}đ
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Thu khác: {transactions?.charge.detail.other}đ
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Tổng thu: {transactions?.charge.total}đ
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setOpenDetail(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export const ModalDetailPrint: React.FC<ModalDetailProps> = (props) => {
  const {
    componentRef,
    setOpenDetail,
    transactions,
    locationSender,
    locationReceiver,
  } = props;
  const styles = {
    key: "font-medium italic",
    value: "font-light italic",
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray">
              <h3 className="text-3xl font-medium">Chi tiết đơn hàng</h3>
              <div
                className="text-3xl cursor-pointer"
                onClick={() => setOpenDetail(null)}
              >
                ×
              </div>
            </div>
            {/*body*/}
            <div className="relative p-6 flex flex-col gap-3 text-xl">
              <div>
                Mã đơn hàng:{" "}
                <span className="font-medium">{transactions?.code}</span>
              </div>
              <div>
                Thông tin nhân viên
                <div className="px-10">
                  <div className="text-base">
                    <span className={styles.key}>Họ và tên: </span>
                    <span className={styles.value}>
                      {transactions?.user.fullname}
                    </span>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Giới tính: </span>
                    <span className={styles.value}>
                      {transactions?.user.gender}
                    </span>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Số điện thoại: </span>
                    <span className={styles.value}>
                      {transactions?.user.phone}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                Thông tin người gửi
                <div className="px-10">
                  <div className="text-base">
                    <span className={styles.key}>Họ và tên: </span>
                    <span className={styles.value}>
                      {transactions?.sender.fullname}
                    </span>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Số điện thoại: </span>
                    <span className={styles.value}>
                      {transactions?.sender.phone}
                    </span>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Địa chỉ người gửi: </span>
                    <span className={styles.value}>{locationSender}</span>
                  </div>
                </div>
              </div>
              <div>
                Thông tin người nhận
                <div className="px-10">
                  <div className="text-base">
                    <span className={styles.key}>Họ và tên: </span>
                    <span className={styles.value}>
                      {transactions?.receiver.fullname}
                    </span>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Số điện thoại: </span>
                    <span className={styles.value}>
                      {transactions?.receiver.phone}
                    </span>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Địa chỉ người nhận: </span>
                    <span className={styles.value}>{locationReceiver}</span>
                  </div>
                </div>
              </div>
              <div>
                Thông tin đơn hàng
                <div className="px-10">
                  <div className="text-base">
                    <span className={styles.key}>Loại hàng gửi: </span>
                    <span className={styles.value}>
                      {transactions?.detail.item_type === "documents"
                        ? "Tài liệu"
                        : "Hàng hoá"}
                    </span>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Chi tiết: </span>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Số lượng: {transactions?.detail.item_quantity}
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Khối lượng: {transactions?.detail.item_weight}
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Trị giá: {transactions?.detail.item_value}
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Giấy tờ đính kèm:{" "}
                      {transactions?.detail.item_attached
                        ? transactions.detail.item_attached
                        : "Không có"}
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Dịch vụ đặc biệt:{" "}
                      {transactions?.detail.item_description
                        ? transactions.detail.item_description
                        : "Không có"}
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Hàng không gửi được: {transactions?.detail.item_return}
                    </div>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Cước: </span>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Cước chính: {transactions?.charge.detail.base}đ
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Phụ phí: {transactions?.charge.detail.surcharge}đ
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Cước GTGT: {transactions?.charge.detail.vat}đ
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Thu khác: {transactions?.charge.detail.other}đ
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Tổng thu: {transactions?.charge.total}đ
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={() => setOpenDetail(null)}
              >
                Close
              </button>
              <div className="bg-neutral-400 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer">
                <ReactToPrint
                  trigger={() => (
                    <div className="flex items-center justify-end gap-2">
                      <PrinterIcon width={20} height={20} />
                      Print
                    </div>
                  )}
                  content={() => componentRef!.current}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
