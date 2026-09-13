import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { Cart } from "../features/Cart/types/Cart";

interface CartContextType {
    cart: Cart;
    setCart: React.Dispatch<React.SetStateAction<Cart>>;
}

const CartContext = createContext<CartContextType|undefined>(undefined);

export function CartProvider({children}: PropsWithChildren) {
    const emptyCart: Cart = {
        id: "",
        userId: "",
        createdAt: "",
        updatedAt: "",
        totalCost: 0,
        shippingCost: 0,
        subtotal: 0,
        cartItems: []
    };
    const [cart, setCart] = useState<Cart>(emptyCart);

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }

    return context;
}