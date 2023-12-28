'use client'

export default function Services() {
    return (
        <div className="flex justify-center px-5">
            <div className="flex flex-col space-y-2 w-5/6 px-5 border border-gray justify-center items-start">
                <div className="w-full font-bold text-center text-xl">Bảng giá vận chuyển</div>
                <div className="w-full flex flex-col justify-center items-center">
                    <img src="/cuoc-phi-Hn,HCM.png" />
                    <img src="/cuoc-phi-63-tinh.png" />
                    <img src="/giai-dap.png" />
                </div>
                <div className="">
                    <div className=""><strong>Lưu ý: </strong>
                        <br />
                        <ol className="list-disc ml-5">
                            <li>
                                Giao hàng tới huyện xã +1 ngày. Đơn hàng liên tỉnh, lấy hàng tại các tỉnh khác Hà Nội, Tp.HCM, Đà
                                Nẵng, thời gian giao hàng +0.5-1 ngày.
                            </li>
                            <li>
                                Hàng hóa cấm bay chọn gói Nhanh sẽ được chuyển bằng đường bộ (+3-4 ngày).
                            </li>
                            <li>Trong một số trường hợp, thời gian giao – nhận có thể nhanh hoặc chậm hơn so với bảng trên,
                                Người sử dụng dịch vụ hiểu và đồng ý với sự thay đổi.
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}