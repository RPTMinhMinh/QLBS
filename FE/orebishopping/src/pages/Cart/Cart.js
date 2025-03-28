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
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 drop-shadow-md text-center my-6">
          KHTT
        </h1>

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
