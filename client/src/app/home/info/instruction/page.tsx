import Image from "next/image";

export default function Instruction() {
    return (
        <div className="relative flex flex-col space-y-2 w-full justify-center items-start">
            <h1 className="font-bold text-xl">Hướng dẫn cho khách hàng</h1>
            <p>Ở trên trang chủ, chúng tôi đã dành nhiều tâm huyết để
                thiết kế sao cho quý khách hàng có thể dễ dàng thao tác với trang web</p>
            <div>
                <Image src="/hd.png" width={500} height={500} alt="instruction" className="w-full h-full" />
            </div>
            <p>Để tra cứu mã vận đơn, quý khách hàng bấm chọn nút Tra cứu đơn hàng trên trang chủ.
                Sau khi ấn, quý khách chỉ cần điền mã vận đơn và ấn nút Tra cứu, sau khi ấn kết quả sẽ hiển thị ngay trên màn hình</p>
            <div>
                <Image src="/tra-cuu-don-hang.png" width={500} height={500} alt="instruction" className="w-full h-full" />
            </div>
            <p>Ngoài ra, để tra cứu các điểm giao dịch gần quý khách, quý khách hàng có thể bấm chọn nút Tra cứu điểm giao dịch trên trang chủ.
                Sau khi ấn, quý khách chỉ cần chọn khu vực mong muốn và ấn nút Tra cứu, sau khi ấn kết quả sẽ hiển thị ngay trên màn hình</p>
            <div>
                <Image src="/tra-cuu-diem-giao-dich.png" width={500} height={500} alt="instruction" className="w-full h-full" />
            </div>
            <p>Nếu quý khách hàng có những câu hỏi hay thắc mắc về vấn đề vận chuyển hay chính sách cũng như về dịch vụ
                của chúng tôi thì quý khách có thể chuyển hướng sang trang Thông tin hoặc trang Dịch vụ để biết thêm thông tin chi tiết.</p>
        </div>
    )
}