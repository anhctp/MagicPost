export enum Transfer {
  CUSTOMER = "Customer",
  GATHERING = "Gathering Point",
}

export const headers = [
  "STT",
  "Mã đơn hàng",
  "Loại đơn hàng",
  "Tình trạng",
  "Chi tiết",
  "",
];
export const headersShort = [
  "STT",
  "Mã đơn hàng",
  "Loại đơn hàng",
  "Tình trạng",
  "Chi tiết",
];
export const colorsChart = ["#FA8072", "#91C788"];

export enum ItemType {
  DOCUMENTS = "documents",
  GOODS = "goods",
}

export enum ItemReturn {
  RETURN = "return",
  RETURN_EXPIRATION = "return expiration",
  CALL_SENDER = "call sender",
  CANCEL = "cancel",
}
export enum TransactionStatus {
  RECEIVED = "received",
  SENDING = "sending",
  SHIPPED = "shipped",
  RETURN = "return",
}

export interface CustomerInfo {
  fullname: string;
  phone: string;
  location_id: number;
}

export interface Transaction {
  sender_info: CustomerInfo;
  receiver_info: CustomerInfo;
  transaction_send_date: string;
  transaction_receive_date: string;
}

export interface TransactionDetail {
  item_type: string;
  item_description: string;
  item_quantity: number;
  item_weight: number;
  item_value: number;
  item_attached: string;
  item_return: string;
  cod: number;
  other_revenue: number;
}

export interface FullTransaction {
  transaction: Transaction;
  detail: TransactionDetail;
}
