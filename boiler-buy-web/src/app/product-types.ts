export interface Product {
    id: number,
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