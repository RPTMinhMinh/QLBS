import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { BiChevronDown, BiChevronsDown, BiShoppingBag, BiUser } from "react-icons/bi";
import { useCart } from "../../redux/CartContext";
import { formatPrice } from "../../constants/constant";
import AuthService from "../../service/AuthService.js";
import pay from "../../service/PaymentService.js";
import { addOrder, addOrderDetail } from "../../service/OrderDetail.js";
import { checkLoyalCustomer } from "../../service/AccountService.js";
// import { ChevronDown } from "lucide-react";

const Payment = () => {
  const { cartData, removeData } = useCart();
  const [totalAmt, setTotalAmt] = useState(0);
  const [user, setUser] = useState();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [loyalCustomer, setLoyalCustomer] = useState(false);
  const shippingFee = 30000;
  const finalTotal = loyalCustomer ? (totalAmt + shippingFee) * 0.85 : totalAmt + shippingFee;
  const discountAmount = loyalCustomer ? (totalAmt + shippingFee) * 0.15 : 0;
  const [address, setAddress] = useState('');


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



  useEffect(() => {
    AuthService.getUser().then((res) => {
      setUser(res.data);
      console.log(res.data);
    }).catch((e) => console.error(e));
  }, []);

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
    setIsOpen(false);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      alert("Vui lòng nhập địa chỉ nhận hàng");
      return;
    }
    localStorage.setItem('paymentMethod', paymentMethod)
    localStorage.setItem("shippingAddress", address);
    if (paymentMethod === "vnpay") {
      
      const amount = finalTotal;
      try {
         
        const response = await pay.createVNPay(amount, "NCB");
        if (response && response.paymentUrl) {
          window.location.href = response.paymentUrl;
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error(error);
      }
    } else if (paymentMethod === "cod") {
      try {
        const res = await addOrder({
          status: "Chờ xác nhận",
          shipping: shippingFee,
          total: finalTotal,
          address: address,
        });
        const orderId = res.data.id;
        await Promise.all(
          cartData.map(async (data) => {
            return addOrderDetail({
              orderId: orderId,
              bookId: data.bookDto?.id,
              quantity: data.quantity,
              price: data.bookDto?.price * (1 - data.bookDto.discount / 100) * data.quantity,
            });
          })
        );

        await Promise.all(cartData.map((cartId) => removeData(cartId.id)));

        navigate("/success");
      } catch (error) {
        console.error(error);
      }
    } else if (paymentMethod === "momo") {
      const total = finalTotal.toString();
      const amount = { "amount": total };
      try {
        const response = await pay.momoPayment(amount);
        localStorage.setItem('orderId', response.orderId);
        if (response && response.payUrl) {
          window.location.href = response.payUrl;
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error(error);
      }

    } else if (paymentMethod === "zalopay") {
      const amount = { "amount": finalTotal };
      try {
        const response = await pay.createZaloPay(amount);
        if (response && response.order_url) {
          window.location.href = response.order_url;
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error(error);
      }

    } else {
      alert("Vui lòng chọn phương thức thanh toán");
    }
  };


  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Thanh toán" />
      <div className="pb-10 flex flex-col md:flex-row">
        {/* Account Information Section */}
        <div className="md:w-1/2 p-4">
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
            <BiUser className="h-6 w-6 mr-3 text-indigo-600" />
            Thông tin khách hàng
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-y-1">
              <label className="block text-sm font-medium text-gray-700">Họ Tên</label>
              <input
                type="text"
                value={user?.fullname || ""}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                readOnly
              />
            </div>
            <div className="grid grid-cols-1 gap-y-1">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                readOnly
              />
            </div>
            <div className="grid grid-cols-1 gap-y-1">
              <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
              <input
                type="text"
                value={user?.address || ""}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                readOnly
              />
            </div>
            <div className="grid grid-cols-1 gap-y-1">
              <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
              <input
                type="text"
                value={user?.phone || ""}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                readOnly
              />
            </div>
            <div className="grid grid-cols-1 gap-y-1">
              <label className="block text-sm font-medium text-gray-700">Địa chỉ nhận hàng</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              />
            </div>
          </div>
        </div>

        {/* Cart Items Section */}
        <div className="md:w-1/2 p-4">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <BiShoppingBag className="h-6 w-6 mr-2 text-gray-600" />
            Giỏ hàng của bạn
          </h2>
          <div className="space-y-2">
            {cartData.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center">
                  <img
                    src={item.bookDto.imageUrl}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold">{item.bookDto.name}</p>
                    <p>Số lượng: {item.quantity}</p>
                    {item.bookDto.discount > 0 && (
                      <p className="text-sm text-red-500">
                        Giảm giá: {item.bookDto.discount}%
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <p>
                    {formatPrice((item.bookDto.price * (1 - (item.bookDto.discount / 100))) * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-2 mt-4">
              <p className="font-semibold text-lg flex justify-between">
                <span>Phí vận chuyển:</span>
                <span>{formatPrice(shippingFee)}</span>
              </p>

              {loyalCustomer && (
                <p className="font-semibold text-lg flex justify-between text-green-600">
                  <span>Giảm giá khách hàng thân thiết (15%):</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </p>
              )}

              <p className="font-semibold text-lg flex justify-between text-red-600">
                <span>Tổng tiền:</span>
                <span>{formatPrice(finalTotal)}</span>
              </p>
            </div>

          </div>
          <div className="flex items-center space-x-4 mt-4">
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-70 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {paymentMethod === "cod" ? "Thanh toán khi nhận hàng" : paymentMethod === "vnpay" ? "Thanh toán qua VNPay" : paymentMethod === "momo" ? "Thanh toán qua Momo" : paymentMethod === "zalopay" ? "Thanh toán qua ZaloPay" : "Chọn phương thức thanh toán"}
                <BiChevronsDown className="w-5 h-5 ml-2" />
              </button>
              {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  <button
                    onClick={() => handlePaymentMethod("cod")}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Thanh toán khi nhận hàng
                  </button>
                  <button
                    onClick={() => handlePaymentMethod("vnpay")}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Thanh toán qua VNPay
                  </button>
                  <button
                    onClick={() => handlePaymentMethod("momo")}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Thanh toán qua Momo
                  </button>
                  <button
                    onClick={() => handlePaymentMethod("zalopay")}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Thanh toán qua ZaloPay
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={handlePayment}
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Thanh toán
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;