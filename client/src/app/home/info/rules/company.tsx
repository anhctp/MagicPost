import ToggleItem from "@/components/home/services/toggleItem";

export default function Company() {
    const style = {
        h1: "text-stone-600 font-bold text-xl",
        ol: "list-inside ml-2 list-[upper-roman] text-md",
        ol1: "list-inside ml-2 list-decimal text-md",
        ol_li: "font-bold",
        ol_ol: "list-disc ml-4 list-inside text-wrap font-normal",
        ol_ol1: "list-[lower-alpha] ml-4 list-inside text-wrap font-bold",
        ol_p: "italic",
    }
    return (
        <ol className={style.ol}>
            <ToggleItem title="CHÍNH SÁCH BỒI THƯỜNG">
                <ol className={style.ol1}>
                    <li>Trường hợp Bưu gửi bị mất, thất lạc, hư hỏng
                        <p className="font-normal indent-5">
                            MagicPost sẽ chịu trách nhiệm bồi thường cho Khách hàng nếu Bưu gửi bị hư hỏng, mất mát hoặc thất lạc xảy ra trong quá trình MagicPost cung ứng Dịch vụ gây ra do lỗi của MagicPost. Trách nhiệm của MagicPost chỉ giới hạn trong thiệt hại và tổn thất trực tiếp và thực tế gây ra cho hoặc liên quan đến Bưu gửi. Các loại thiệt hại hoặc tổn thất khác (bao gồm nhưng không hạn chế bởi tổn thất lợi nhuận, thu nhập, cơ hội kinh doanh) sẽ bị loại trừ.
                        </p>
                        <ol className={style.ol_ol1}>
                            <li>Bưu gửi là thư từ, tài liệu, ấn phẩm, giấy tờ, hóa đơn, hợp đồng và các loại văn bản khác:
                                <p className="font-normal indent-5">
                                    Trong trường hợp Bưu gửi bị hư hỏng, mất mát hoặc thất lạc, khoản tiền bồi thường MagicPost sẽ trả cho Khách hàng sẽ bằng 04 (bốn) lần Cước phí của Dịch vụ đã sử dụng.
                                </p>
                            </li>
                            <li>Bưu gửi là vật phẩm, hàng hóa hoặc Phiếu có giá trị quy đổi:
                                <ol className={style.ol_ol}>
                                    <li>
                                        Trường hợp Bưu gửi bị mất, thất lạc toàn bộ bưu gửi
                                    </li>
                                    <li>
                                        Trường hợp Bưu gửi bị hư hỏng:
                                        <br />
                                        Khoản tiền bồi thường sẽ phụ thuộc vào mức độ hư hỏng của Bưu gửi
                                        <br />
                                        <p className="font-bold">Khách hàng thừa nhận và đồng ý rằng:</p>

                                        (i) MagicPost sẽ bồi thường cho trường hợp Bưu gửi bị hư hỏng mà không có nghĩa vụ phải truy cứu nguyên nhân của các hư hỏng đó;
                                        <br />
                                        (ii) Mức độ hư hỏng của Bưu gửi sẽ do MagicPost có toàn quyền xác minh và quyết định;
                                        <br />
                                        (iii) Trong trường hợp Bưu gửi bị hư hỏng trên 50% thì MagicPost sẽ được quyền sở hữu hàng hóa trong Bưu gửi đó.
                                        Khách hàng cam kết sẽ, đồng ý vô điều kiện và tuân theo mọi yêu cầu của MagicPost, để ký kết các tài liệu cần thiết cho mục đích chuyển quyền sở hữu đối với hàng hoá đó.
                                    </li>
                                    <li>
                                        Trường hợp mất, thất lạc hoặc hư hỏng một hoặc một vài sản phẩm không đi liền theo bộ trong cùng một Bưu gửi:
                                        <br />
                                        (i) Trường hợp xảy ra mất, thất lạc một hoặc một vài sản phẩm không đi liền theo bộ trong cùng một Bưu gửi
                                        <br />
                                        (ii) Trường hợp hư hỏng một hoặc một vài sản phẩm không đi liền theo bộ trong cùng một Bưu gửi
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </li>
                    <li>
                        Trường hợp chậm trễ giao phát Bưu gửi
                        <ol className={style.ol_ol1}>
                            <li>
                                Trễ toàn trình
                                <p className="indent-5 font-normal">
                                    Trong trường hợp Bưu gửi được phát cho Người Nhận trễ so với thời gian toàn trình thì MagicPost sẽ không tính Cước phí Dịch vụ của Đơn hàng bị trễ đó. Trong trường hợp xảy ra Sự Kiện Bất Khả Kháng, thời gian toàn trình dự kiến có thể kéo dài thêm từ 10 (mười) đến 15 (mười lăm) ngày kể từ ngày kết thúc Sự Kiện Bất Khả Kháng.
                                    <br />
                                    (***) Để tránh hiểu lầm, "Sự kiện bất khả kháng" có nghĩa là bất kỳ sự cản trở, chậm trễ hoặc ngừng hoạt động nào xảy ra do dịch bệnh, bãi công, đóng cửa, tranh chấp lao động, thiên tai, chiến tranh, bạo động trong dân chúng, hỏa hoạn hay các sự cố/ tai họa khác; những thay đổi trong chính sách của cơ quan có thẩm quyền mà vượt quá khả năng kiểm soát hợp lý của một Bên khiến cho Bên đó không thể thực hiện các nghĩa vụ được theo thỏa thuận.
                                </p>
                            </li>
                            <li>
                                Không xử lý
                                <p className="font-normal indent-5">
                                    Trừ trường hợp do Sự kiên bất khả kháng và/hoặc do lỗi của Khách hàng, nếu MagicPost giữ Bưu gửi mà không thực hiện giao phát cho Người nhận quá 30 (ba mươi) ngày tính từ ngày Bưu gửi được MagicPost nhận từ Khách hàng, hoặc không phát trả Bưu gửi cho Khách hàng hoặc thông báo cho Khách hàng lên nhận lại Bưu gửi trong thời hạn 30 (ba mươi) ngày tính từ ngày giao phát không thành công, thì MagicPost sẽ bồi thường đơn hàng đó theo như chính sách bồi thường mất hàng.
                                    <br />
                                    Quy định trên không áp dụng cho trường hợp hai bên đang có tranh chấp về Đơn hàng hoặc MagicPost trả Bưu gửi nhưng Khách hàng từ chối nhận lại Bưu gửi từ 03 (ba) lần trở lên.
                                </p>
                            </li>
                            <li>
                                Bồi thường đối với Bưu gửi hoàn trả không thành công
                                <p className="indent-5 font-normal">
                                    Đối với Bưu gửi giao không thành công nhưng khi hoàn trả lại cho Khách hàng hoặc Người gửi không thành công mà bị thất thoát, hư hỏng: Đền bù 04 (bốn) lần Cước phí của Dịch vụ đã sử dụng đối với Đơn hàng đó.
                                    <br />
                                    Hoàn trả Bưu gửi không thành công: được hiểu MagicPost là đã liên hệ khách hàng, người gửi để hoàn trả hàng trong thời gian xử lý được phép nhưng không thể liên hệ được, hoặc đã liên hệ được nhưng khách hàng, người gửi không đến nhận lại hàng theo thỏa thuận hoặc thông báo của MagicPost.
                                </p>
                            </li>
                        </ol>
                    </li>
                    <li>
                        Các lưu ý và quy định khác về trách nhiệm bồi thường của MagicPost
                        <ol className={style.ol_ol}>
                            <li>
                                MagicPost sẽ chỉ thanh toán khoản tiền bồi thường trực tiếp cho Khách hàng. Trong trường hợp Khách hàng ủy quyền cho người khác nhận khoản tiền bồi thường, Khách hàng cần phải cung cấp cho MagicPost một thư ủy quyền hợp lệ được MagicPost chấp nhận.
                            </li>
                            <li>
                                Đối với Bưu gửi là Phiếu có giá trị quy đổi có thời hạn sử dụng thì Khách hàng sẽ chỉ được bồi thường nếu thời hạn sử dụng của phiếu phải còn ít nhất là 03 (ba) tháng tính từ khi MagicPost nhận Bưu gửi. Khách hàng thừa nhận và đồng ý rằng Khách hàng sẽ không có quyền yêu cầu bồi thường, và MagicPost sẽ không có trách nhiệm bồi thường, nếu phiếu có giá trị quy đổi bị mất hay hư hỏng không đạt điều kiện này.
                            </li>
                            <li>
                                Trong mọi trường hợp mất, thất lạc hoặc hư hỏng xảy ra cho Bưu gửi, khoản
                                tiền bồi thường sẽ không thấp hơn 04 (bốn) lần Cước phí của Dịch vụ đã sử
                                dụng.
                            </li>
                            <li>
                                Khách hàng thừa nhận và đồng ý rằng nếu Khách hàng từ chối hoặc không phối
                                hợp để thực hiện đồng kiểm Bưu gửi với MagicPost thì trong trường hợp xảy ra mất
                                mát, thất lạc, hư hỏng cho Bưu gửi, khoản tiền bồi thường MagicPost phải trả cho Khách hàng sẽ chỉ bằng 04 (bốn) lần Cước phí của Dịch vụ đã sử dụng.
                            </li>
                            <li>
                                Khách hàng thừa nhận và đồng ý rằng trong trường hợp xảy ra mất mát, thất lạc, hư hỏng cho Bưu gửi mà Khách hàng không cung cấp được Hóa đơn chứng minh Giá trị khai báo hàng hóa theo quy định tại Mục II trên đây thì khoản tiền bồi thường MagicPost phải trả cho Khách hàng sẽ chỉ bằng 04 (bốn) lần Cước phí của Dịch vụ đã sử dụng.
                            </li>
                            <li>
                                Khách hàng thừa nhận và đồng ý rằng trong mọi trường hợp, khoản tiền bồi thường trên đã bao gồm việc hoàn trả Cước phí Dịch vụ đã thanh toán cho MagicPost.
                            </li>
                            <li>
                                Khách hàng từ bỏ và sẽ không thực hiện bất kỳ và mọi quyền, quyền yêu cầu, hành động chống lại MagicPost liên quan đến tổn thất, thiệt hại gây ra cho Bưu gửi vượt quá hạn chế trách nhiệm bồi thường của MagicPost như nêu tại Mục III này.
                            </li>
                        </ol>
                    </li>
                </ol>
            </ToggleItem>
            <ToggleItem title="BỒI THƯỜNG BỞI KHÁCH HÀNG">
                <p className="font-normal indent-5">
                    Khách hàng thừa nhận và đồng ý sẽ bồi thường, bảo vệ và giữ cho MagicPost và cổ đông, giám đốc,
                    người quản lý, nhân viên, nhà thầu, tư vấn của MagicPost (các “Bên được bồi thường của MagicPost”)
                    không bị ảnh hưởng và tránh khỏi bất kỳ và mọi thiệt hại, tổn thất, chi phí và phí
                    (bao gồm phí pháp lý), yêu cầu, trách nhiệm, khiếu kiện, lệnh, yêu cầu, hành động của
                    cơ quan nhà nước có thẩm quyền, có thể được đưa ra chống lại hoặc phải gánh chịu bởi MagicPost
                    và các Bên được bồi thường của MagicPost, là hậu quả của hoặc phát sinh từ hoặc có liên quan đến:
                </p>
                <ol className={style.ol_ol}>
                    <li>
                        Thiệt hại, hư hỏng, tổn thất, mất mát, hao hụt, trách nhiệm, yêu cầu, khiếu kiện liên quan đến Bưu gửi đó gây ra bởi hành động hoặc việc không thực hiện một hành động nào của Khách hàng, bao gồm nhưng không hạn chế bởi việc cung cấp, kê khai thông tin về Bưu gửi không đúng hoặc thiếu sót; đóng gói, bao bọc Bưu gửi không đầy đủ, không phù hợp, không cẩn thận, không tuân thủ quy định, hướng dẫn về đóng gói của MagicPost, nhà sản xuất hay quy định của pháp luật; Thông tin Người Nhận không đúng hoặc thiếu sót; hoặc
                    </li>
                    <li>
                        Bưu gửi thuộc trường hợp bị cấm gửi, chấp nhận, vận chuyển theo quy định của pháp luật; hoặc
                    </li>
                    <li>
                        Khách hàng vi phạm quy định pháp luật.
                    </li>
                </ol>
            </ToggleItem>
            <ToggleItem title="MIỄN TRỪ TRÁCH NHIỆM">
                <p className="indent-5 font-normal">
                    Khách hàng thừa nhận và đồng ý MagicPost sẽ được miễn trừ trách nhiệm và sẽ vô can đối với bất kỳ và mọi thiệt hại, tổn thất, mất mát, hư hỏng, bồi thường, chậm trễ, yêu cầu, trách nhiệm, khiếu kiện, hành động của Khách hàng và/hoặc cơ quan nhà nước có thẩm quyền có thể được đưa ra chống lại hoặc phải gánh chịu bởi MagicPost và các Bên được bồi thường của MagicPost liên quan đến Bưu gửi được gây ra bởi, phát sinh từ, hoặc liên quan đến:
                </p>
                <ol className={style.ol_ol}>
                    <li>
                        Sự không tuân thủ bởi Khách hàng bất kỳ quy định của pháp luật về hàng hóa cấm hoặc hạn chế lưu thông, vận chuyển và các quy định khác của pháp luật (bao gồm, nhưng không hạn chế bởi trường hợp Bưu gửi không có hóa đơn, chứng từ nguồn gốc xuất xứ; bị kiểm tra, tạm giữ, tịch thu hoặc tiêu hủy (dẫn đến bị mất mát, giảm khối lượng, giảm chất lượng hay hư hỏng toàn bộ hoặc một phần) theo quyết điṇh của cơ quan có thẩm quyền hoặc an ninh sân bay.
                    </li>
                    <li>
                        Sự không tuân thủ bởi Khách hàng bất kỳ thỏa thuận nào về sử dụng Dịch vụ của MagicPost, hoặc bất kỳ quy định, chính sách nào của MagicPost (bao gồm, nhưng không hạn chế bởi Bưu gửi nằm ngoài phạm vi nhận vận chuyển của MagicPost, địa chỉ giao hoặc nhận Bưu gửi không thuộc phạm vi cung ứng Dịch vụ của MagicPost, Bưu gửi thuộc danh mục hàng hóa không được vận chuyển qua đường hàng không; Khách hàng không thực hiện đúng các quy định về khiếu nại, giải quyết tranh chấp theo luật định hoặc theo Chính sách chăm sóc Khách hàng của MagicPost);
                    </li>
                    <li>
                        Hành động hoặc không thực hiện hành động nào của Khách hàng, cho dù là do lỗi cẩu thả, bất cẩn, cố ý làm sai, hoặc lừa dối (bao gồm, nhưng không hạn chế bởi trường hợp việc cung cấp, kê khai thông tin về Bưu gửi không đúng hoặc thiếu sót; đóng gói, bao bọc Bưu gửi không đầy đủ, không phù hợp, không cẩn thận, không tuân thủ quy định, hướng dẫn về đóng gói của MagicPost, nhà sản xuất hay quy định của pháp luật; Thông tin Người Nhận không đúng hoặc thiếu sót Khách hàng không có chứng từ chứng minh Bưu gửi bị mất hoặc hư hỏng; Khách hàng không có chứng từ chứng minh việc sử dụng Dịch vụ, Khách hàng dán sai mã đơn hàng);
                    </li>
                    <li>
                        Hành động hoặc không thực hiện hành động của một bên thứ ba, cho dù là do lỗi cẩu thả, bất cẩn, cố ý làm sai, hoặc lừa dối (bao gồm, nhưng không hạn chế bởi trường hợp hàng hóa bị cướp, giật; hư hỏng, mất mát gây ra bởi Người Nhận; hàng hóa không đáp ứng yêu cầu, tiêu chuẩn về chất lượng, quy cách, bao gồm nhưng không giới hạn trường hợp màu sắc, kích cỡ, chất liệu sản phẩm không đúng với hình ảnh, thông tin được cung cấp bởi người bán hàng hoặc nhà sản xuất; chuyến bay chậm trễ hoặc bị hủy; bị cơ quan chức năng kiểm tra trên đường vận chuyển);
                    </li>
                    <li>
                        Đặc tính tự nhiên, khuyết tật vốn có của hàng hóa nằm trong Bưu gửi;
                    </li>
                    <li>
                        Suy suyển, hao mòn, hư hỏng khách quan, tự nhiên diễn ra trong quá trình vận chuyển (bao gồm, nhưng không hạn chế bởi trường hợp hàng hóa bị thay đổi hình dáng, màu sắc khi nhiệt độ môi trường thay đổi, đặc điểm của hàng hóa gây ra tự cháy, biến chất, hao hụt, han gỉ, nứt vỡ, ẩm mốc…);
                    </li>
                    <li>
                        Khách hàng từ chối nhận lại Bưu gửi hoặc MagicPost không liên hệ được với Khách hàng sau khi MagicPost đã thực hiện giao trả lại Bưu gửi ít nhất 03 (ba) lần. Trong trường hợp này, Khách hàng thừa nhận và đồng ý rằng Khách hàng đã từ bỏ mọi quyền và quyền yêu cầu và MagicPost sẽ được miễn trừ khỏi mọi yêu cầu, trách nhiệm, khiếu kiện liên quan đến Bưu gửi. Để tránh hiểu lầm, sau 06 (sáu) tháng kể từ lần trả cuối cùng nêu trên, MagicPost sẽ được quyền sở hữu hàng hoá trong Bưu gửi đó và rằng, Khách hàng cam kết không có bất kỳ khiếu nại, khiếu kiện nào về vấn đề này.
                    </li>
                    <li>
                        Trong trường hợp một phần thiệt hại, tổn thất xảy ra do Khách hàng vi phạm, Khách hàng thừa nhận và đồng ý sẽ từ bỏ quyền yêu cầu đối với, và MagicPost sẽ không có trách nhiệm bồi thường cho, phần thiệt hại, tổn thất tương ứng với mức độ thiệt hại do Khách hàng gây ra.
                    </li>
                    <li>
                        Bưu gửi đã được phát và Người nhận không có ý kiến khi nhận Bưu gửi.
                    </li>
                    <li>
                        Các trường hợp bất khả kháng theo quy định của Luật Việt Nam.
                    </li>
                    <li>
                        Trường hợp Khách hàng có yêu cầu bổ sung thêm thông tin ID nhân viên của MagicPost (sau đây gọi chung là “ID Nhân Viên”) vào tài khoản đăng nhập để tạo đơn hàng của Khách hàng (sau đây gọi chung là “Tài Khoản Tạo Đơn Hàng”) trên Hệ thống của MagicPost thì Khách hàng đồng ý rằng:
                        <ol className={style.ol_ol}>
                            <li>
                                Khách hàng sẽ miễn trừ cho MagicPost toàn bộ trách nhiệm phát sinh từ hoặc liên quan đến việc khiếu kiện, khiếu nại về các hành vi được thao tác qua ID Nhân Viên liên quan đến việc tạo đơn hàng trên Hệ thống của MagicPost thông qua Tài Khoản Tạo Đơn Hàng – bao gồm nhưng không giới hạn các vấn đề liên quan đến việc bảo mật thông tin của Khách hàng, các thông tin liên quan đến đơn hàng, việc tạo đơn hàng ảo…
                            </li>
                            <li>
                                Trường hợp phát sinh bất kỳ vấn đề hoặc hành vi vi phạm pháp luật nào phát sinh từ hoặc liên quan đến ID Nhân Viên dẫn đến ảnh hưởng trực tiếp hoặc gián tiếp đến Khách hàng và/hoặc bên thứ ba thì sẽ do nhân viên đó chịu trách nhiệm trực tiếp trước pháp luật và/hoặc bên bị thiệt hại.
                            </li>
                            <li>
                                Khách hàng sẽ chịu toàn bộ trách nhiệm liên quan đến các thao tác từ Tài Khoản Tạo Đơn Hàng trên Hệ thống, kể cả thao tác trực tiếp từ Khách hàng hay từ ID Nhân Viên – bao gồm nhưng không giới hạn việc tạo, quản lý, kiểm tra đơn hàng, các vấn đề về bảo mật liên quan đến đơn hàng… Để tránh hiểu lầm, MagicPost sẽ không chịu bất kỳ trách nhiệm nào phát sinh từ hoặc liên quan đến Tài Khoản Tạo Đơn Hàng thông qua ID Nhân Viên.
                            </li>
                        </ol>
                    </li>
                </ol>
            </ToggleItem>
        </ol>
    )
}