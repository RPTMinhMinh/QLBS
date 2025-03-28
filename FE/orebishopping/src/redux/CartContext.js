import { createContext, useContext, useEffect, useState } from "react";
import { getAllCartByEmail, addCart, deleteCart, updateCart, deleteCartAfterPayment } from "../service/CartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = async () => {
        try {
            const response = await getAllCartByEmail();
            setCartData(response.content);
        } catch (error) {
            console.error(error);
        }
    };
    
    const addCartItem = async (req) => {
        try {
            await addCart( req );
            fetchCartData();
        } catch (error) {
            console.error(error);
        }
    };
    
    const deleteCartItem = async (id) => {
        try {
            await deleteCart(id);
            fetchCartData();
        } catch (error) {
            console.error(error);
        }
    };

    const removeData = async (id) => {
        try {
            await deleteCartAfterPayment([id]);
            fetchCartData();
        } catch (error) {
            console.error(error);
        }
    };


    const updateCartItem = async (id, req) => {
        try {
            await updateCart(id, req);
            fetchCartData();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <CartContext.Provider value={{ cartData, addCartItem, deleteCartItem, updateCartItem, removeData }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
