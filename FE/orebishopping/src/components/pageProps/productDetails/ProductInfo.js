import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { addCart } from "../../../service/CartService";
import { useCart } from "../../../redux/CartContext";
import { toast } from "react-toastify";

const ProductInfo = ({ bookDetail }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { addCartItem } = useCart();

  const handleAddToCart = () => {
    const obj = { bookId: bookDetail.id, quantity: 1 }
    try {
      if (token) {
        addCartItem(obj)
        toast.success("Thêm vào giỏ hàng thành công")
      } else {
        toast.error("Vui lòng đăng nhập!")
      }
    } catch (e) {
      toast.error("Sản phẩm đã hết hàng")
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{bookDetail.name}</h2>
      <p className="text-xl font-semibold">{bookDetail.price} VND</p>
      <p className="text-base text-gray-600">Số lượng: {bookDetail.quantity}</p>
      <p className="text-sm">Mô tả: {bookDetail.description}</p>
      <p className="font-medium text-lg">
        <span className="font-normal">Tác giả:</span> {bookDetail.author}
      </p>
      <p className="font-medium text-lg">
        <span className="font-normal">Giảm giá:</span> {bookDetail.discount ? `${bookDetail.discount}%` : 'Không có'}
      </p>
      <p className="font-medium text-lg">
        <span className="font-normal">Nhà xuất bản:</span> {bookDetail.publisherName}
      </p>
      <p className="font-normal text-sm">
        <span className="text-base font-medium">Danh mục:</span> {bookDetail.categoryName}
      </p>
      {bookDetail.quantity > 0 && (
        <button
        onClick={() => handleAddToCart()}
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
      )}
      

    </div>
  );
};

export default ProductInfo;
