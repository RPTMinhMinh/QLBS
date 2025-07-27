import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";
import { getCartByEmail } from "../../service/CartService";
import { formatPrice } from "../../constants/constant";
import { useCart } from "../../redux/CartContext";
import { checkLoyalCustomer } from "../../service/AccountService";

const Cart = () => {
  const dispatch = useDispatch();
  const [totalAmt, setTotalAmt] = useState(0);
  const { cartData } = useCart()
  const [loyalCustomer, setLoyalCustomer] = useState(false)
  // console.log("object",cartData);



  useEffect(() => {
    let price = 0;
    cartData.forEach((item) => {
      price += (item.bookDto.price * (1 - (item.bookDto.discount / 100))) * item.quantity;
    });
    setTotalAmt(price);
    checkLoyalCustomer().then((res) => {
      setLoyalCustomer(res.data);
    }).catch((e) => console.error(e));
  }, [cartData]);

  const shippingFee = 30000; // Phí vận chuyển
  const finalTotal = loyalCustomer ? (totalAmt + shippingFee) * 0.85 : totalAmt + shippingFee;
  const discountAmount = loyalCustomer ? (totalAmt + shippingFee) * 0.15 : 0;


  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Giỏ hàng" />
      {loyalCustomer && (
          <div className="relative bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 rounded-lg mb-6 overflow-hidden">
            <div className="absolute -top-2 -right-2 opacity-20">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
              >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="relative z-10 flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-2 rounded-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                  <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">KHÁCH HÀNG THÂN THIẾT</h2>
                <p className="text-sm font-light">
                  Ưu đãi đặc biệt: Giảm ngay 15% tổng hóa đơn + nhiều ưu đãi khác
                </p>
              </div>
            </div>
          </div>
      )}
      {cartData.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-6 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2 text-center">Sản phẩm</h2>
            <h2 className="text-center">Giá tiền</h2>
            <h2 className="text-center">Số lượng</h2>
            <h2 className="text-center">Giảm giá</h2>
            <h2 className="text-center">Thành tiền</h2>
          </div>
          <div className="mt-5">
            {cartData.map((item) => (
              <div key={item.id}>
                <ItemCard item={item} cartData={cartData} />
              </div>
            ))}
          </div>


          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Tổng tiền giỏ hàng</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Thành tiền
                  <span className="font-semibold tracking-wide font-titleFont">
                    {formatPrice(totalAmt)}
                  </span>
                </p>

                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Phí vận chuyển
                  <span className="font-semibold tracking-wide font-titleFont">
                    {formatPrice(shippingFee)}
                  </span>
                </p>

                {loyalCustomer && (
                  <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium text-green-600">
                    Giảm giá thành viên (15%)
                    <span className="font-semibold tracking-wide font-titleFont">
                      -{formatPrice(discountAmount)}
                    </span>
                  </p>
                )}

                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Tổng tiền
                  <span className="font-bold tracking-wide text-lg font-titleFont text-red-600">
                    {formatPrice(finalTotal)}
                  </span>
                </p>
              </div>

              <div className="flex justify-end">
                <Link to="/paymentgateway">
                  <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                    Thanh toán
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Giỏ hàng của bạn đang trống
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Giỏ hàng của bạn tồn tại để phục vụ bạn. Hãy cho nó một mục đích - hãy lấp đầy nó với sách và làm cho nó hạnh phúc.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Tiếp tục mua sắm
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
