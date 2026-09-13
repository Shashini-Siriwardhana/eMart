export interface CartItem {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    productName: string;
    price: number;
    imageUrl: string;
    subtotal: number;
}