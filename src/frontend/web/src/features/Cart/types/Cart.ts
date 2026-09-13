import type { CartItem } from "./CartItem";

export interface Cart {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    totalCost: number;
    shippingCost: number;
    subtotal: number;
    cartItems: CartItem[];
}