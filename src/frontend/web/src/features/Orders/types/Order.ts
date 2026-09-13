import type { OrderItem } from "./OrderItem";

export interface Order {
    id: string;
    userId: string;
    status: string;
    totalAmount: number;
    orderItems: OrderItem[];
}