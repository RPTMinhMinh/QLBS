import React from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { formatPrice } from "../../../constants/constant";
import { addWishlist } from "../../../service/AccountService";
import { ToastContainer, toast } from 'react-toastify'; // Import thư viện
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from "../../../redux/CartContext";

const Product = ({ id, name, imageUrl, price, author, discount, quantity }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { addCartItem } = useCart();

  // Tính toán giá đã giảm
  const discountedPrice = discount ? price * (1 - discount / 100) : price;

  // Xử lý xem chi tiết sản phẩm
  const handleProductDetails = (id) => {
    navigate(`/product/${id}`)
  };

  const handleAddToWishlist = (id) => {
    if (token) {
      addWishlist(id).then(() => {
        toast.success("Đã thêm vào danh sách yêu thích!");
      }).catch((e) => console.error(e));
    } else {
      alert("Vui lòng đăng nhập!");
    }
  }

  const handleAddToCart = () => {
    const obj = { bookId: id, quantity: 1 }
    try {
      if (token) {
        addCartItem(obj)
        toast.success("Thêm vào giỏ hàng thành công")
      } else {
        toast.error("Vui lòng đăng nhập!")
      }
    } catch (e) {
      toast.error("Sản phẩm đã hết hàng");
    }
  }

  return (
      <div className="w-full relative group">
        <ToastContainer/>
        <div className="max-w-80 max-h-80 relative overflow-y-hidden">
          <div className="w-[320px] h-[420px] relative overflow-hidden">
            <Image className="w-[320px] h-[340px] object-cover" imgSrc={imageUrl}/>
          </div>

          <div className="absolute top-6 left-8">
            {discount !== null && discount !== undefined && <Badge discount={discount}/>}
          </div>
          <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
            <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">

              {quantity > 0 && (
                  <li
                      onClick={() => handleAddToCart()}
                      className="hover:text-primeColor text-sm flex items-center justify-end gap-2 cursor-pointer pb-1 duration-300 w-full"
                  >
                    Thêm vào giỏ hàng
                    <FaShoppingCart/>
                  </li>
              )}
              <li
                  onClick={() => handleProductDetails(id)}
                  className="hover:text-primeColor text-sm flex items-center justify-end gap-2 cursor-pointer pb-1 duration-300 w-full"
              >
                Xem chi tiết
                <MdOutlineLabelImportant/>
              </li>
              <li
                  onClick={() => handleAddToWishlist(id)}
                  className="hover:text-primeColor text-sm flex items-center justify-end gap-2 cursor-pointer pb-1 duration-300 w-full">
                Yêu thích
                <BsSuitHeartFill/>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
          <div className="flex items-center justify-between gap-3 font-titleFont">
            <h2
                className="text-lg font-bold truncate"
                title={name}
            >
              {name}
            </h2>
            {discount ? (
                <p className="text-[14px] text-red-500 whitespace-nowrap">{formatPrice(discountedPrice)}</p>
            ) : (
                <p className="text-[14px] whitespace-nowrap">{formatPrice(price)}</p>
            )}
          </div>
          <p className="text-[14px] text-gray-600">{author}</p>
        </div>


      </div>
  );
};

export default Product;
