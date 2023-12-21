export enum StaffGatheringItem {
  SEND = "send",
  RECEIVE = "receive",
}
export enum StaffTransactionItem {
  SEND = "send",
  RECEIVE = "receive",
  STATISTIC = "statistic",
}

export const headerStaffGatheringItem = [
  {
    id: StaffGatheringItem.RECEIVE,
    label: "Hàng đến",
    link: "/staff-gathering/receive",
  },
  {
    id: StaffGatheringItem.SEND,
    label: "Hàng đi",
    link: "/staff-gathering/send",
  },
];

export const headerStaffTransactionItem = [
  {
    id: StaffTransactionItem.RECEIVE,
    label: "Hàng đến",
    link: "/staff-transaction/receive",
  },
  {
    id: StaffTransactionItem.SEND,
    label: "Hàng đi",
    link: "/staff-transaction/send",
  },
  {
    id: StaffTransactionItem.STATISTIC,
    label: "Thống kê",
    link: "/staff-transaction/statistic",
  },
];
