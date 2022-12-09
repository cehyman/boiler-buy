export interface ChatMessageItem {
    senderEmail: string,
    receiverEmail: string,
    productID: number,
    message: string
}

export interface ChatGroup {
    currEmail: string,
    otherEmail: string | null,
    productID: number | null,
    productName?: string,
    currImage: string,
    otherImage: string,
}