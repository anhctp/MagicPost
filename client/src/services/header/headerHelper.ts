export enum StaffGatheringItem {
    SEND = "send",
    RECEIVE = "receive",
}

export const headerStaffGatheringItem = [
    {
        id: StaffGatheringItem.RECEIVE,
        label: "Hàng đến",
        link: "/staff-gathering/receive"
    },
    {
        id: StaffGatheringItem.SEND,
        label: "Hàng đi",
        link: "/staff-gathering/send"
    },
]