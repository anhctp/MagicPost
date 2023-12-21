import Image from "next/image";
import Barcode from "react-barcode";

interface ReceiptProps {
  innerRef: React.RefObject<HTMLDivElement>;
}

const Receipt: React.FC<ReceiptProps> = ({ innerRef }) => {
  return (
    <div ref={innerRef} className="w-full flex p-4">
      <div className="w-full flex justify-around items-center">
        <Image src={"/favicon.ico"} alt="icon" width={200} height={200} />
        <Barcode height={100} value="MP264989219012" />
      </div>
    </div>
  );
};

export default Receipt;
