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
    location: string[]
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

export interface RecentlyViewedItem {
    email: string,
    lastViewed: Date,
    product: Product,
}

export interface locationInterface {
    location: string,
    value: string,
    checked: boolean
}

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

export interface GroupAdInput {
    name: string,
    product_id: number,
    checked: boolean
}

export interface GroupAdObj {
    id: number
    name: string,
    email: string,
    products: number[]
}

export interface GroupAdList extends Array<GroupAdObj> { }


