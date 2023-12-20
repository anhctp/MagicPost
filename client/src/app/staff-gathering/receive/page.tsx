import Table from "@/components/table";

export default function StaffGathering() {
  const data = [
    {
      id: 1,
      code: "MP264989219012",
      transaction_type: "Deliver",
      status: "processing",
    },
    {
      id: 2,
      code: "MP264989219012",
      transaction_type: "Deliver",
      status: "processing",
    },
    {
      id: 3,
      code: "MP264989219012",
      transaction_type: "Deliver",
      status: "processing",
    },
    {
      id: 4,
      code: "MP264989219012",
      transaction_type: "Deliver",
      status: "processing",
    },
    {
      id: 5,
      code: "MP264989219012",
      transaction_type: "Deliver",
      status: "processing",
    },
    {
      id: 6,
      code: "MP264989219012",
      transaction_type: "Deliver",
      status: "processing",
    },
    {
      id: 7,
      code: "MP264989219012",
      transaction_type: "Deliver",
      status: "processing",
    },
  ];
  const headers = ["STT", "Mã đơn hàng", "Loại đơn hàng", "Tình trạng", "Chi tiết"];
  return (
    <>
      <div>StaffGathering receive</div>
      <Table headers={headers} data={data} rowsPerPage={5} />
    </>
  );
}
