import React from "react";
import { PrinterIcon } from "@heroicons/react/24/outline";
import ReactToPrint from "react-to-print";
import useReceipt from "@/hooks/useReceipt";

interface ModalDetailProps {
  openDetail: number | null;
  setOpenDetail: React.Dispatch<React.SetStateAction<number | null>>;
}

export const ModalDetail: React.FC<ModalDetailProps> = (props) => {
  const { openDetail, setOpenDetail } = props;
  const { data, locationReceiver, locationSender } = useReceipt(openDetail!);
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
                Mã đơn hàng: <span className="font-medium">{data?.code}</span>
              </div>
              <div>
                Thông tin nhân viên
                <div className="px-10">
                  <div className="text-base">
                    <span className={styles.key}>Họ và tên: </span>
                    <span className={styles.value}>{data?.user.fullname}</span>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Giới tính: </span>
                    <span className={styles.value}>{data?.user.gender}</span>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Số điện thoại: </span>
                    <span className={styles.value}>{data?.user.phone}</span>
                  </div>
                </div>
              </div>
              <div>
                Thông tin người gửi
                <div className="px-10">
                  <div className="text-base">
                    <span className={styles.key}>Id người gửi: </span>
                    <span className={styles.value}>
                      {data?.sender.customer_id}
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
                    <span className={styles.key}>Id người nhận: </span>
                    <span className={styles.value}>
                      {data?.sender.customer_id}
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
                      {data?.detail.item_type === "documents"
                        ? "Tài liệu"
                        : "Hàng hoá"}
                    </span>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Chi tiết: </span>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Số lượng: {data?.detail.item_quantity}
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Khối lượng: {data?.detail.item_weight}
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Trị giá: {data?.detail.item_value}
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Giấy tờ đính kèm:{" "}
                      {data?.detail.item_attached
                        ? data.detail.item_attached
                        : "Không có"}
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Dịch vụ đặc biệt:{" "}
                      {data?.detail.item_description
                        ? data.detail.item_description
                        : "Không có"}
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Hàng không gửi được: {data?.detail.item_return}
                    </div>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Cước: </span>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Cước chính: {data?.charge.detail.base}đ
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Phụ phí: {data?.charge.detail.surcharge}đ
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Cước GTGT: {data?.charge.detail.vat}đ
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Thu khác: {data?.charge.detail.other}đ
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Tổng thu: {data?.charge.total}đ
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
              <button
                className="bg-neutral-400 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setOpenDetail(null)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

interface ModalDetailPrintProps {
  openDetail: number | null;
  setOpenDetail: React.Dispatch<React.SetStateAction<number | null>>;
  componentRef: React.RefObject<HTMLDivElement>;
}

export const ModalDetailPrint: React.FC<ModalDetailPrintProps> = (props) => {
  const { openDetail, componentRef, setOpenDetail } = props;
  const { data, locationReceiver, locationSender } = useReceipt(openDetail!);
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
                Mã đơn hàng: <span className="font-medium">{data?.code}</span>
              </div>
              <div>
                Thông tin nhân viên
                <div className="px-10">
                  <div className="text-base">
                    <span className={styles.key}>Họ và tên: </span>
                    <span className={styles.value}>{data?.user.fullname}</span>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Giới tính: </span>
                    <span className={styles.value}>{data?.user.gender}</span>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Số điện thoại: </span>
                    <span className={styles.value}>{data?.user.phone}</span>
                  </div>
                </div>
              </div>
              <div>
                Thông tin người gửi
                <div className="px-10">
                  <div className="text-base">
                    <span className={styles.key}>Id người gửi: </span>
                    <span className={styles.value}>
                      {data?.sender.customer_id}
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
                    <span className={styles.key}>Id người nhận: </span>
                    <span className={styles.value}>
                      {data?.sender.customer_id}
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
                      {data?.detail.item_type === "documents"
                        ? "Tài liệu"
                        : "Hàng hoá"}
                    </span>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Chi tiết: </span>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Số lượng: {data?.detail.item_quantity}
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Khối lượng: {data?.detail.item_weight}
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Trị giá: {data?.detail.item_value}
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Giấy tờ đính kèm:{" "}
                      {data?.detail.item_attached
                        ? data.detail.item_attached
                        : "Không có"}
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Dịch vụ đặc biệt:{" "}
                      {data?.detail.item_description
                        ? data.detail.item_description
                        : "Không có"}
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Hàng không gửi được: {data?.detail.item_return}
                    </div>
                  </div>
                  <div className="text-base">
                    <span className={styles.key}>Cước: </span>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Cước chính: {data?.charge.detail.base}đ
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Phụ phí: {data?.charge.detail.surcharge}đ
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Cước GTGT: {data?.charge.detail.vat}đ
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Thu khác: {data?.charge.detail.other}đ
                    </div>
                    <div className={`${styles.value} px-4`}>
                      {" "}
                      Tổng thu: {data?.charge.total}đ
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
                  content={() => componentRef.current}
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
