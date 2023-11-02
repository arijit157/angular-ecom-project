export interface sellerSignup{
    name: string,
    email: string,
    password: string
}

export interface sellerLogin{
    email: string,
    password: string
}

export interface product{
    name: string,
    price: number,
    color: string,
    category: string,
    description: string,
    image_url: string, 
    id: number,
    quantity: number | undefined
}

export interface cart{
    userID: number,
    name: string,
    price: number,
    color: string,
    category: string,
    description: string,
    image_url: string, 
    productID: number,
    quantity: number | undefined,
    id: number | undefined
}

export interface order{
    email: string,
    address: string,
    contactNumber: string,
    userID: number,
    totalAmount: number,
    orderedAt: string,
    id: number | undefined
}