export interface Product {
    id: number,
    productType: string,
    priceDollars: number,
    priceCents: number,
    shippingDollars: number,
    shippingCents: number,
    name: string,
    description: string,
    reported: boolean,
    isPending: boolean,
    isSold: boolean,
    canShip: boolean,
    canMeet: boolean,
    sellerRating: number,
    sellerRatingCount: number,
}

export interface PurchaseInfo {
    name: string,
    description: string,
    totalPriceDollars: number,
    totalPriceCents: number,
    buyerEmail: string,
    sellerEmail: string,
    purchaseTime: Date,
    //TODO: images
}

export interface ProductList extends Array<Product> { }

export interface FilterSearchInput {
    name: string | null,
    productType: string[] | null,
    minPrice: number | null,
    maxPrice: number | null,
    minSellerRating: number | null,
    maxSellerRating: number | null,
    brand: string[] | null,
    tags: string[] | null
}

