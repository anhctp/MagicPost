'use client'

import { useState, useEffect } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

let images = [
  "/slide 1.jpg",
  "/slide2.png",
  "/slide3.png",
];

export default function Slider() {
  let [index, setIndex] = useState(0);

  useEffect(() => {
    // Auto-play every 5 seconds
    const intervalId = setInterval(() => {
      if (index + 1 < images.length) setIndex(index + 1);
      else setIndex(0);
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [index]);

  return (
    <MotionConfig transition={{ duration: 2, ease: [0.32, 0.72, 0, 1] }} >

      <div className="h-full justify-center items-center flex" >
        <AnimatePresence initial={false}>
          <div className="w-[5%] flex justify-center items-center">
            {index > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0, pointerEvents: "none" }}
                whileHover={{ opacity: 1 }}
                className="top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                onClick={() => setIndex(index - 1)}
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </motion.button>
            )}
          </div>
        </AnimatePresence>

        <AnimatePresence initial={false}>
          <motion.div key={index} className="inline-flex w-[90%]">
            <div className="w-1/2 items-center justify-center flex">
              <Image src={images[index]} width={500} height={400} alt="" className="w-auto h-auto object-cover" />
            </div>

            <div className="w-1/2 items-center justify-center flex px-10">
              {index == 0 && (
                <div className="m-auto text-left">
                  <p className="text-stone-600 text-center text-2xl font-bold">Giới thiệu về công ty</p>
                  <br />
                  <p className="indent-7">MagicPost là công ty hoạt động trong lĩnh vực chuyển phát. Ưu thế của Magic Post là tốc độ nhanh, mạng lưới phủ sóng rộng trên toàn quốc và đặc biệt là thế mạnh trong việc nghiên cứu và ứng dụng công nghệ mới phục vụ cho hoạt động chuyển phát.</p>
                  <br />
                  <p className="indent-7"> Chúng tôi tin rằng dịch vụ này là hữu ích cho xã hội nói chung. Người bán hàng bán được nhiều hơn, khách hàng mua sắm thoải mái hơn, và người giao hàng có thêm nhiều công việc và thu nhập xứng đáng.</p>
                </div>
              )}

              {index == 1 && (
                <div className="m-auto text-left">
                  <p className="text-stone-600 text-center text-2xl font-bold">Tầm nhìn</p>
                  <br />
                  <p className="indent-7"> Bản hàng ở mọi nơi và được hậu cần bởi MagicPost. Xây dựng nền tảng hậu cần MagicPost, lấy công nghệ làm trung tâm, lấy trải nghiệm khách hàng làm mục tiêu, ứng dụng sâu rộng công nghệ và dữ liệu để tạo nên phương thức vận hành tiết kiệm và hiệu quả cao cho khách hàng.</p>
                  <br />
                  <p className="text-stone-600 text-center text-2xl font-bold">Sứ mệnh</p>
                  <br />
                  <p className="indent-7"> Bất kỳ ai ở bất kỳ đâu, với chiếc điện thoại di động trên tay đều có thể tham gia kinh doanh trực tuyến; để nuôi ước mơ tự doanh, tự lập, đổi đời.</p>
                </div>
              )}

              {index == 2 && (
                <div className="m-auto text-left">
                  <p className="text-stone-600 text-center text-2xl font-bold">Cam kết</p>
                  <br />
                  <p className="indent-7">Không chỉ là một công ty chuyển phát, MagicPost còn chú trọng vào các nguyên tắc cộng đồng và luôn cam kết ưu tiên phát triển bền vững.</p>
                  <br />
                  <p className="indent-7">Dịch vụ của chúng tôi giúp đáp ứng các nhu cầu thiết yếu hàng ngày. Chúng tôi tạo việc làm và hỗ trợ các hộ kinh doanh địa phương. Chúng tôi hướng tới sự phát triển bền vững. Chúng tôi hướng tới hệ sinh thái bền vững thông qua các hợp tác chiến lược.</p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence initial={false}>
          <div className="w-[5%] flex justify-center items-center">
            {index + 1 < images.length && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0, pointerEvents: "none" }}
                whileHover={{ opacity: 1 }}
                className="top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                onClick={() => setIndex(index + 1)}
              >
                <ChevronRightIcon className="h-6 w-6" />
              </motion.button>
            )}
          </div>
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}