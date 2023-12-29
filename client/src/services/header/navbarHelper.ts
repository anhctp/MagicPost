  export enum CEOItem {
    TRANSACTION = 'manage at transaction point', 
    GATHERING = 'manage at gathering point', 
  }
  
  export const navbarCEOItem = [
    {
      id: CEOItem.TRANSACTION,
      label: "Điểm giao dịch",
      link: "/ceo/system",
    },
    {
      id: CEOItem.GATHERING,
      label: "Điểm tập kết",
      link: "/ceo/system",
    }
  ];