import React from "react";
import { ImCross } from "react-icons/im";
import { formatPrice } from "../../constants/constant";
import { useCart } from "../../redux/CartContext";

const ItemCard = ({ item }) => {
    const { deleteCartItem, updateCartItem } = useCart()
    const handleRemoveFromCart = (id) => {
        deleteCartItem(id)
    }

    const handleUpdateQuantity = (id, quantity) => {
        if (quantity < 1) {
            return;
        }
        updateCartItem(id, { quantity })
    }
    return (
        <div className="w-full grid grid-cols-6 mb-4 border py-2">
            <div className="flex col-span-2 items-center gap-7 ml-4">
                <ImCross
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
                />
                <img className="w-32 h-32" src={item.bookDto.imageUrl} alt="productImage" />
                <h1 className="font-titleFont font-semibold">{item.bookDto.name}</h1>
            </div>
            <div className="flex items-center justify-center text-lg font-semibold">
                {formatPrice(item.bookDto.price)}
            </div>
            <div className="flex items-center justify-center gap-6 text-lg">
                <span
                    onClick={() => handleUpdateQuantity(item.bookDto.id, item.quantity - 1)}
                    className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300">
                    -
                </span>
                <p>{item.quantity}</p>
                <span
                    onClick={() => handleUpdateQuantity(item.bookDto.id, item.quantity + 1)}
                    className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300">
                    +
                </span>
            </div>
            <div className="flex items-center justify-center text-lg font-semibold">
                {item.bookDto.discount}%
            </div>
            <div className="flex items-center justify-center font-titleFont font-bold text-lg">
                <p>{formatPrice((item.bookDto.price * (1 - (item.bookDto.discount / 100))) * item.quantity)}</p>
            </div>
        </div>
    );
};

export default ItemCard;
