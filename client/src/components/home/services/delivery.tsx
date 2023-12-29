import ToggleItem from "./toggleItem"

export default function Delivery() {
    const style = {
        h1: "text-stone-600 font-bold text-xl",
        ol: "list-inside ml-2 list-[upper-roman] text-md",
        ol_li: "font-bold",
        ol_ol: "list-disc ml-4 list-inside text-wrap font-normal",
        ol_p: "italic",
    }

    return (
        <ol className={style.ol}>
            <ToggleItem title="DANH MỤC HÀNG HÓA KHÔNG NHẬN VẬN CHUYỂN">
                <ol className={style.ol_ol}>
                    <li>
                        Các chất ma tuý (bao gồm cả tiền chất và các chất hoá học tham gia vào quá trình chế tạo các
                        chất ma tuý, kể cả các chất dùng trong y tế và nghiên cứu khoa học), các chất kích thích thần kinh.
                    </li>
                    <li>
                        Vũ khí, đạn dược, quân trang, quân dụng, phương tiện kỹ thuật chuyên dùng của các lực lượng vũ
                        trang.
                    </li>
                    <li>
                        Vật sắc nhọn, vũ khí thô sơ: dao găm, mã tấu, thương, kiếm, mác,…; vũ khí thể thao; công cụ hỗ trợ
                        và vũ khí khác có tính năng, tác dụng tương tự.
                    </li>
                    <li>
                        Các loại ấn phẩm, tài liệu có nội dung kích động, gây mất an ninh, phá hoại đoàn kết dân tộc,
                        chống phá Nhà nước Cộng hoà xã hội chủ nghĩa Việt Nam.
                    </li>
                    <li>
                        Vật, chất dễ nổ (kể cả bùi nhùi sắt), dễ cháy, chất độc, chất phóng xạ, vi trùng dịch bệnh (kể cả các
                        chất dùng trong y tế và nghiên cứu khoa học), và các chất gây nguy hiểm hoặc làm mất vệ sinh,
                        gây ô nhiễm môi trường.
                    </li>
                    <li>
                        Các vật, tài liệu phản động, đồi trụy, mê tín dị đoan, trái đạo đức xã hội, trái thuần phong mỹ tục của
                        Việt Nam hoặc có hại tới giáo dục thẩm mỹ, nhân cách.
                    </li>
                    <li>
                        Nguyên liệu thuốc lá, sản phẩm thuốc lá (thuốc cỏ, thuốc lá điếu, xì gà, thuốc lá sợi, thuốc lào,
                        thuốc lá điện tử,…) và các dạng thuốc lá thành phẩm khác nhập lậu.
                    </li>
                    <li>
                        Hóa chất độc hại: Xịt hơi cay, nước tẩy chứa hàm lượng axit cao,…; thuốc thú y, thuốc bảo vệ thực
                        vật cấm hoặc chưa được phép sử dụng tại Việt Nam.
                    </li>
                    <li>
                        Pháo các loại, bao gồm nhưng không giới hạn: pháo hoa, pháo nổ, pháo bông, pháo sáng,…
                    </li>
                    <li>
                        Sinh vật sống; thực vật rừng nguy cấp, quý hiếm; thực phẩm yêu cầu bảo quản.
                    </li>
                    <li>
                        Tiền Việt Nam, nước ngoài và các giấy tờ có giá trị như tiền; hóa đơn GTGT; giấy tờ không thể cấp
                        lại; bản gốc các giấy tờ chứng thực cá nhân, văn bằng, chứng chỉ,….
                    </li>
                    <li>
                        Tài liệu, hiện vật thuộc di tích lịch sử, văn hoá, bảo tàng (bia ký, gia phả, tiền cổ,…); Tài liệu mang bí
                        mật Nhà nước, …
                    </li>
                    <li>
                        Các loại kim khí quý (vàng, bạc, đá quý,…) dưới dạng khối, thỏi, miếng.
                    </li>
                    <li>
                        Bộ phận cơ thể hoặc sản phẩm của động vật rừng: ngà voi, sừng tê giác, da, vảy tê tê,…
                    </li>
                    <li>
                        Phương tiện, ngư cụ không được sử dụng trong khai thác thuỷ, hải sản (bao gồm cả công cụ kích
                        điện, xung điện,…)
                    </li>
                    <li>
                        Các vật phẩm, hàng hóa khác mà pháp luật của Việt Nam quy định cấm lưu thông, cấm xuất –
                        nhập khẩu, cấm nhập vào nước nhận, cấm vận chuyển bằng đường bưu chính theo quy định của
                        pháp luật Việt Nam, điều ước quốc tế mà Cộng hòa xã hội chủ nghĩa Việt Nam là thành viên tại
                        từng thời điểm.
                    </li>
                    <div className={style.ol_p}><strong>Lưu ý: </strong><br />
                        <p className="indent-5">Hàng hoá, thư tín có điều kiện chuyển phát đặc thù, Người gửi phải cung cấp thông tin chi tiết cho MagicPost
                            trước khi gửi hàng để hai bên xem xét việc từ chối nếu MagicPost không đủ điều kiện. Trường hợp Người gửi không
                            có thông báo khác thì tuân theo quy định vận chuyển, đóng gói của MagicPost, MagicPost được miễn trừ trách nhiệm
                            việc nhận, chuyển phát, các rủi ro hàng hoá, thư tín bị tổn thất, hư hỏng hàng hoá.
                        </p>
                    </div>
                </ol>
            </ToggleItem>
            <ToggleItem title="DANH MỤC HÀNG HÓA KHÔNG VẬN CHUYỂN ĐƯỜNG HÀNG KHÔNG">
                <ol className={style.ol_ol}>
                    <li>
                        Chất khí (Bình ga, bình xịt phòng, bình xịt côn trùng, xịt tóc, bình ô–xy,….).
                    </li>
                    <li>
                        Chất lỏng dễ cháy (Sơn, xăng, dầu, cồn, rượu, keo dán, nước hoa,…).
                    </li>
                    <li>
                        Chất rắn dễ cháy (Bột kim loại, bột hóa chất,…).
                    </li>
                    <li>
                        Chất phóng xạ, oxy hóa, ăn mòn, chất bột.
                    </li>
                    <li>
                        Sản phẩm có từ trường (nam châm,…).
                    </li>
                    <li>
                        Trang sức, vàng, các hàng hóa có giá trị cao.
                    </li>
                    <li>
                        Thiết bị điện tử có tích điện: pin, pin sạc dự phòng, điện thoại di động, máy cạo râu dùng pin,…
                    </li>
                    <li>
                        Các hàng hóa khác theo Danh mục hàng hóa không nhận vận chuyển của MagicPost, quy định của hàng
                        không.
                    </li>
                    <div className={style.ol_p}>
                        <strong>Lưu ý:</strong><br />
                        <ol className={style.ol_ol}>
                            <li>
                                Hàng hóa ghi tên sản phẩm bằng Tiếng Anh hoặc tên sản phẩm không rõ ràng cũng sẽ được MagicPost liệt vào Danh
                                mục hàng hóa không nhận vận chuyển đường hàng không.
                            </li>
                            <li>
                                Người gửi có trách nhiệm ghi chú rõ ràng thông tin “Hàng không vận chuyển hàng không” lên trên gói hàng.
                                Trường hợp Người gửi không ghi chú rõ ràng dẫn đến việc hàng hóa bị thu giữ, tiêu hủy, vận chuyển chậm hoặc
                                không thể vận chuyển được MagicPost sẽ không chịu trách nhiệm.
                            </li>
                            <li>
                                Hàng hoá hợp pháp không thể vận chuyển đường hàng không được chuyển sang vận chuyển đường bộ, các hình
                                thức khác.
                            </li>
                        </ol>
                    </div>
                </ol>
            </ToggleItem>
            <ToggleItem title="QUY ĐỊNH VỀ KIỂM TRA HÀNG HÓA">
                <ol className={style.ol_ol}>
                    <p className="indent-5">
                        Để đảm bảo an toàn, an ninh trong quá trình cung ứng dịch vụ, kịp thời ngăn chặn đối tượng xấu
                        lợi dụng gửi hàng hóa cấm qua mạng bưu chính, bảo vệ quyền lợi cho các khách hàng chân chính,
                        MagicPost triển khai thực hiện việc kiểm tra nội dung gói, kiện hàng.
                    </p>
                    <ol className="list-decimal list-inside">
                        <li className="font-semibold">
                            Kiểm tra 100% gói, kiện hàng
                            <div className="font-normal">
                                <p className="indent-5">
                                    Nhân viên MagicPost sẽ kiểm tra hàng hóa bằng cách chụp hình ảnh bên ngoài và bên trong đơn hàng.
                                    Hình ảnh lưu trữ trên hệ thống là cơ sở pháp lý quan trọng để xử lý các vấn đề phát sinh theo quy
                                    định của pháp luật.
                                </p>
                                <p className="indent-5">Nhân viên MagicPost khi kiểm tra thao tác:</p>
                                <ol className={style.ol_ol}>
                                    <li>
                                        Bước 1: Chụp đúng - đủ - đảm bảo chất lượng hình ảnh (bên ngoài và bên trong ĐH) để xác minh
                                        đã kiểm tra các ĐH Shop gửi.
                                    </li>
                                    <li>
                                        Bước 2: Báo xấu Shop nếu sản phẩm bên trong là hàng cấm. Các ĐH cấm sẽ được chuyểnsang
                                        trạng thái không lấy được hàng.
                                    </li>
                                    MagicPost ưu tiên việc đồng kiểm cùng Shop, trường hợp không thể cùng đồng kiểm, MagicPost sẽ thông
                                    báo cho Shop trước khi bóc mở kiện hàng và ghi nhận hình ảnh kiểm tra làm căn cứ.
                                </ol>
                            </div>
                        </li>

                        <li className="font-semibold">Sau khi kiểm tra gói, kiện hàng</li>
                        <ol className={style.ol_ol}>
                            <li>
                                Nếu gói, kiện hàng không chứa hàng hóa không nhận vận chuyển, gói, kiện hàng của Shop sẽ được
                                gia cố và tiếp tục chuyển phát.
                            </li>
                            <li>
                                Trường hợp phát hiện trong gói, kiện của Shop có chứa hàng hóa thuộc Danh mục hàng hóa không
                                nhận vận chuyển hoặc hộp rỗng không chứa hàng, MagicPost có quyền giao nộp hàng hóa cấm theo
                                quy định pháp luật cho cơ quan chức năng; đối với hàng MagicPost không nhận vận chuyển thì Shop
                                phải đến nhận lại trong vòng 02 (hai) ngày kể từ ngày MagicPost thông báo, quá thời hạn trên MagicPost có
                                toàn quyền xử lý gói, kiện.
                            </li>
                            <div className={style.ol_p}><strong>Lưu ý:</strong><br />
                                <ol className={style.ol_ol}>
                                    <li>
                                        Việc kiểm tra đảm bảo không gây ra hư hỏng, mất mát hàng hóa của Shop; Shop chịu hoàn toàn trách nhiệm về
                                        hàng và mọi chi phí, thiệt hại phát sinh (nếu có) trong trường hợp Shop gửi hàng cấm, hàng MagicPost không nhận
                                        vận chuyển, hàng không nhận vận chuyển đường hàng không, MagicPost được loại trừ mọi trách nhiệm liên quan đến
                                        hàng hóa.
                                    </li>
                                    <li>
                                        Việc kiểm tra chính là cách bảo vệ quyền lợi cho Shop, vì vậy, rất mong Shop phối hợp thực hiện. Để đảm bảo
                                        an toàn chung cho toàn hệ thống, MagicPost buộc phải từ chối các đơn hàng không thể thực hiện kiểm tra đúng yêu
                                        cầu.
                                    </li>
                                </ol>
                            </div>
                        </ol>
                    </ol>
                </ol>
            </ToggleItem>
            <ToggleItem title="QUY ĐỊNH ĐÓNG GÓI">
                <ol className={style.ol_ol}>
                    <p className="indent-5">Quy định đóng gói được MagicPost đưa ra nhằm đảm bảo an toàn cho hàng hóa trong quá trình vận
                        chuyển từ Người gửi tới khách hàng. Đóng gói đúng quy cách giúp bảo vệ hàng hóa, giảm tình
                        trạng trả hàng, tiết kiệm chi phí cho Người gửi. Khi có sự cố xảy ra trong quá trình vận chuyển, quy
                        định đóng gói hàng hóa dùng làm căn cứ quy chiếu trách nhiệm cho các bên liên quan.
                    </p>
                </ol>
            </ToggleItem>
        </ol>
    )
}