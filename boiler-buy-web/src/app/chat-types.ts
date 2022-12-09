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
    productImage?: string,
}

export interface ChatGroupPK {
    buyer: string,
    seller: string,
    productID: number,
}

export interface ChatGroupFull {
    buyer: string,
    seller:string,
    product:number,
    isNegotiating:boolean,
    quantity:number,
    shippingPriceDollars:number,
    shippingPriceCents:number,
    finalPriceDollars:number,
    finalPriceCents:number,
    isShipping:boolean,
    trackingNumber:string,
    trackingLink:string,
}