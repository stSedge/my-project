import React, { createContext, useState, ReactNode, useContext } from 'react';

interface product_data {
    id: number;
    name: string;
    price: number;
}

interface CartItem {
    flower: product_data;
    quantity: number; 
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (flower: product_data) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (flower: product_data) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(item => item.flower.id === flower.id && item.flower.name === flower.name);
            if (existingItemIndex >= 0) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += 1;
                return updatedCart;
            } else {
                return [...prevCart, { flower, quantity: 1 }];
            }
        });
    };
    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter(item => item.flower.id !== id));
    };
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
