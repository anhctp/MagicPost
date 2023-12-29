export enum StaffGatheringItem {
  SEND = "send",
  RECEIVE = "receive",
}
export enum StaffTransactionItem {
  SEND = "send",
  RECEIVE = "receive",
  STATISTIC = "statistic",
}
export enum CEOItem {
  SYSTEM = 'system', 
  ACCOUNT = 'account', 
  STATISTIC = 'statistic',
}
export enum LeaderItem {
  ACCOUNT = 'account', 
  STATISTIC = 'statistic'
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

export const headerCEOItem = [
  {
    id: CEOItem.SYSTEM,
    label: "Quản lý hệ thống",
    link: "/ceo/system",
  },
  {
    id: CEOItem.ACCOUNT,
    label: "Quản lý tài khoản trưởng điểm",
    link: "/ceo/account",
  },
  {
    id: CEOItem.STATISTIC,
    label: "Thống kê",
    link: "/ceo/statistic",
  },
];
export const headerLeaderGatheringItem = [
  {
    id: LeaderItem.ACCOUNT,
    label: "Quản lý tài khoản",
    link: "/leaderGathering/account",
  },
  {
    id: CEOItem.STATISTIC,
    label: "Thống kê",
    link: "/leaderGathering/statistic",
  },
];
export const headerLeaderTransactionItem = [
  {
    id: LeaderItem.ACCOUNT,
    label: "Quản lý tài khoản",
    link: "/leaderTransaction/account",
  },
  {
    id: CEOItem.STATISTIC,
    label: "Thống kê",
    link: "/leaderTransaction/statistic",
  },
];