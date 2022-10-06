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
}

export interface ProductList extends Array<Product> { }

export interface FilterSearchInput {
    name: string | null,
    productType: string[] | null,
    minPrice: number | null,
    maxPrice: number | null,
    sellerRatingLowerBound: number | null,
    tags: string[] | null
}