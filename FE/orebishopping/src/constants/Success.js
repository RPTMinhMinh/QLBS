import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import pay from '../service/PaymentService';
import { addOrder, addOrderDetail } from '../service/OrderDetail';
import { useCart } from '../redux/CartContext';
import { checkLoyalCustomer } from '../service/AccountService';


export const Success = () => {
  const [searchParams] = useSearchParams();
  const { cartData, removeData } = useCart();
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const shippingFee = 30000;
  const [totalAmt, setTotalAmt] = useState(0);
  const [loyalCustomer, setLoyalCustomer] = useState(false);

  const handleOrderCreation = async (computedFinalTotal) => {
    if (isOrderCreated) return;

    try {
      setIsOrderCreated(true);

      const shippingAddress = localStorage.getItem("shippingAddress") || "Chưa cung cấp";
      const paymentMethod = localStorage.getItem("paymentMethod" )
      const res = await addOrder({
        status: "Chờ lấy hàng",
        shipping: shippingFee,
        total: computedFinalTotal,
        address: shippingAddress,
      });

      const orderId = res.data.id;

      await Promise.all(cartData.map((data) =>
        addOrderDetail({
          orderId,
          bookId: data.bookDto?.id,
          quantity: data.quantity,
          price: data.bookDto?.price * (1 - data.bookDto.discount / 100) * data.quantity,
        })
      ));

      const requestPaymentMethod = {
        paymentMethod: paymentMethod,
        orderId: orderId
      }

      await pay.createPaymentMethod(requestPaymentMethod);

      await Promise.all(cartData.map((cartItem) => removeData(cartItem.id)));

      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("paymentMethod");

    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
      setIsOrderCreated(false);
    }
  };

  useEffect(() => {
    if (isOrderCreated || cartData.length === 0) return;

    const processPayment = async () => {
      try {
        let price = cartData.reduce((sum, item) =>
          sum + (item.bookDto.price * (1 - item.bookDto.discount / 100)) * item.quantity,
          0
        );
        setTotalAmt(price);

        const res = await checkLoyalCustomer();
        const loyal = res.data;
        setLoyalCustomer(loyal);

        const computedFinalTotal = loyal ? (price + shippingFee) * 0.85 : price + shippingFee;

        const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
        if (vnp_ResponseCode === "00") {
          const result = await pay.handleVNPayReturn(searchParams);
          if (result?.status === "00") {
            await handleOrderCreation(computedFinalTotal);
            return;
          }
        }

        const appTransId = searchParams.get("apptransid");
        if (appTransId) {
          const result = await pay.getOrderStatus(appTransId);
          if (result?.return_code === 1) {
            await handleOrderCreation(computedFinalTotal);
            return;
          }
        }

        const orderId = localStorage.getItem("orderId");
        if (orderId) {
          const data = await pay.checkPaymentStatus(orderId);
          if (data.resultCode === 0) {
            await handleOrderCreation(computedFinalTotal);
            return;
          }
        }
      } catch (error) {
        console.error("Lỗi trong useEffect:", error);
      }
    };

    processPayment();
  }, [searchParams, cartData, isOrderCreated]);

  return (
    <main>
      <div className="payment-success-container">
        <div className="payment-success-box">
          <img
            style={{ margin: '0 auto', display: 'block' }}
            src="https://png.pngtree.com/png-vector/20240705/ourmid/pngtree-green-tick-mark-green-tick-png-image_12888798.png"
            alt="success"
            className="success-icon"
          />
          <h2 className="success-title">Thanh toán thành công!</h2>
          <p className="success-description">Cảm ơn bạn đã mua sản phẩm!</p>
          <a href="/shop" className="success-btn">Tiếp tục mua sắm</a>
        </div>
      </div>
      <style jsx>{`
        .payment-success-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 70vh;
          background-color: #f9fafb;
          padding: 20px;
        }
        .payment-success-box {
          text-align: center;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 100%;
        }
        .success-icon {
          width: 80px;
          height: 80px;
          margin-bottom: 20px;
        }
        .success-title {
          font-size: 28px;
          color: #2d3748;
          margin-bottom: 12px;
          font-weight: bold;
        }
        .success-description {
          font-size: 18px;
          color: #4a5568;
          margin-bottom: 20px;
        }
        .success-btn {
          display: inline-block;
          padding: 12px 24px;
          background-color: #4CAF50;
          color: #ffffff;
          border-radius: 8px;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          transition: background-color 0.2s ease-in-out;
        }
        .success-btn:hover {
          background-color: #45a049;
        }
      `}</style>
    </main>
  );
};
