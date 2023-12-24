import Image from "next/image";
import Barcode from "react-barcode";

interface ReceiptProps {
  innerRef: React.RefObject<HTMLDivElement>;
  transactions: any;
  locationSender: any;
  locationReceiver: any;
}

const Receipt: React.FC<ReceiptProps> = ({
  innerRef,
  transactions,
  locationSender,
  locationReceiver,
}) => {
  const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });
  const currentDate = new Date().toLocaleDateString();

  return (
    <div ref={innerRef} className="w-full flex flex-col p-4">
      <div className="w-full flex justify-around items-center">
        <div>
          <Image src={"/logo-black.png"} alt="icon" width={200} height={200} />
        </div>
        <Barcode
          height={80}
          value={transactions ? transactions.code : "undefined"}
        />
      </div>
      {transactions && (
        <div className="w-full border border-black mt-2 text-gray-500 text-lg">
          <div id="top" className="w-full flex border-b border-black">
            <div id="left" className="w-1/2 p-2">
              <p className="font-bold text-black">
                1. Họ tên, địa chỉ người gửi:
              </p>
              <div className="w-full">{transactions.sender.fullname}</div>

              <div>{locationSender}</div>

              <div className="flex">
                <div className="w-1/2 flex">
                  <div className="font-bold">Điện thoại:</div>
                  <div className="ml-2">{transactions.sender.phone}</div>
                </div>

                <div className="w-1/2 flex ">
                  <div className="font-bold">Mã khách hàng:</div>
                  <div className="ml-2">{transactions.sender.id}</div>
                </div>
              </div>
            </div>

            <div id="right" className="w-1/2 p-2 border-l border-l-black">
              <p className="font-bold text-black">
                2. Họ tên, địa chỉ người nhận:
              </p>

              <div className="w-full">{transactions.receiver.fullname}</div>

              <div>{locationReceiver}</div>

              <div className="flex">
                <div className="w-1/2 flex">
                  <div className="font-bold">Điện thoại:</div>
                  <div className="ml-2">{transactions.receiver.phone}</div>
                </div>

                <div className="w-1/2 flex">
                  <div className="font-bold">Mã khách hàng:</div>
                  <div className="ml-2">{transactions.receiver.id}</div>
                </div>
              </div>
            </div>
          </div>

          <div id="bottom" className="w-full flex">
            <div id="left" className="w-1/2">
              <div className="flex flex-col gap-2 w-full p-2 border-b border-b-black">
                <div>
                  <div className="font-bold text-black">3. Loại hàng gửi: </div>
                  <div className="flex items-center justify-around">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked={
                          transactions.detail.item_type === "documents"
                        }
                      />
                      <p>Tài liệu</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked={
                          transactions.detail.item_type === "goods"
                        }
                      />
                      <p>Hàng hóa</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-black">4. Nội dung bưu gửi:</p>
                  <table className="border-collapse w-full table-auto">
                    <thead>
                      <tr className="bg-gray">
                        <th className="border">Nội dung</th>
                        <th className="border">Số lượng</th>
                        <th className="border">Trị giá</th>
                        <th className="border">Giấy tờ đính kèm</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border text-center">Tổng</td>
                        <td className="border text-center">
                          {transactions.detail.item_quantity}
                        </td>
                        <td className="border text-center">
                          {transactions.detail.item_value}
                        </td>
                        <td className="border text-center">
                          {transactions.detail.item_attached}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <div className="font-bold text-black">
                    5. Dịch vụ đặc biệt/Cộng thêm:{" "}
                  </div>
                  {transactions.detail.item_description ? (
                    <div>{transactions.detail.item_description}</div>
                  ) : (
                      <input
                        type="text"
                        className="border-b outline-none w-full"
                      />
                  )}
                </div>
              </div>

              <div className="w-full p-2 border-b border-b-black">
                <p className="font-bold text-black">
                  6. Chỉ dẫn của người gửi khi không phát được bưu gửi
                </p>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="return"
                      defaultChecked={
                        transactions.detail.item_return === "return"
                      }
                    />
                    <label htmlFor="return">Chuyển hoàn ngay</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="call_sender"
                      defaultChecked={
                        transactions.detail.item_return === "call sender"
                      }
                    />
                    <label htmlFor="call_sender">Gọi cho người gửi</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="cancer"
                      defaultChecked={
                        transactions.detail.item_return === "cancel"
                      }
                    />
                    <label htmlFor="cancer">Huỷ</label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="return_expiration"
                    defaultChecked={
                      transactions.detail.item_return === "return expiration"
                    }
                  />
                  <label htmlFor="return_expiration">
                    Chuyển hoàn khi hết thời gian lưu trữ
                  </label>
                </div>
              </div>
              <div className="w-full p-2">
                <p className="font-bold text-black">7. Cam kết của người gửi</p>
                <p>
                  Tôi chấp nhận điều khoản tại mặt sau phiếu gửi và cam đoan bưu
                  gửi này không chứa các mặt hàng nguy hiểm , cấm gửi. Trường
                  hợp không phát được hãy thực hiện chỉ dẫn ở mục 6, tôi sẽ trả
                  cước chuyển hoàn.
                </p>
              </div>

              <div className="w-full flex p-2">
                <div className="w-1/2 h-24 flex flex-col justify-between">
                  <p className="h-10 font-bold text-black">8. Ngày giờ gửi:</p>
                  <div className="flex">
                    <p>{currentTime}</p>
                    <p className="ml-2">{currentDate}</p>
                  </div>
                </div>

                <div className="w-1/2 font-bold text-black text-center">
                  <p>Chữ ký người gửi</p>
                </div>
              </div>
            </div>

            <div
              id="right"
              className="w-1/2 flex flex-col justify-between border-l border-l-black"
            >
              <div className="flex h-full">
                <div id="left" className="w-1/2 border-r">
                  <div className="w-full p-2">
                    <p className="font-bold text-black">9. Cước</p>
                    <div className="flex justify-between">
                      <p>a, Cước chính</p>
                      <p>{transactions.charge.detail.base}</p>
                    </div>

                    <div className="flex justify-between">
                      <p>b, Phụ phí</p>
                      <p>{transactions.charge.detail.surcharge}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>c, Cước GTGT</p>
                      <p>{transactions.charge.detail.vat}</p>
                    </div>

                    <div className="flex justify-between">
                      <p>d, Thu khác</p>
                      <p>{transactions.charge.detail.other}</p>
                    </div>

                    <div className="flex justify-between font-bold text-black">
                      <p>f, Tổng thu</p>
                      <p>{transactions.charge.total}</p>
                    </div>
                  </div>
                  <div className="w-full p-2 border-t">
                    <p className="font-bold text-black">
                      11. Thu của người nhận
                    </p>
                    <div className="flex justify-between">
                      <p>COD</p>
                      <p>{transactions.detail.cod}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Thu khác</p>
                      <p>{transactions.detail.other_revenue}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Tổng thu</p>
                      <p>
                        {transactions.detail.other_revenue +
                          transactions.detail.cod}
                      </p>
                    </div>
                  </div>
                </div>
                <div id="right" className="w-1/2">
                  <div className="w-full p-2">
                    <p className="font-bold text-black">10. Khối lượng (g)</p>
                    <div className="flex justify-between">
                      <p>Khối lượng thực tế:</p>
                      <p>{transactions.detail.item_weight}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Khối lượng quy đổi:</p>
                      <p>0</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex border-t border-t-black">
                <div id="left" className="w-1/2 h-full border-r">
                  <div className="w-full h-full p-2">
                    <p className="font-bold text-black">
                      12. Bưu cục chấp nhận
                    </p>
                    <p className="text-center">Chữ ký GDV nhận</p>
                  </div>
                </div>

                <div id="right" className="w-1/2 h-full">
                  <div className="w-full p-2">
                    <p className="font-bold text-black">13. Ngày giờ nhận</p>
                    <div className="text-left">
                      <p>.....h..... / ..... / ..... / 20......</p>
                    </div>
                    <div className="text-center">
                      <p>Người nhận / Người ủy quyền nhận</p>
                      <p>(Ký, ghi rõ họ tên)</p>
                    </div>
                    <div className="h-40"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Receipt;
