package vn.edu.hunre.qlbs.service;

import jakarta.servlet.http.HttpServletRequest;
import vn.edu.hunre.qlbs.model.dto.PaymentMethodDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.VNPayResponse;

import java.util.Map;

public interface IPaymentService {
    BaseResponse<PaymentMethodDto> addPaymentMethod(PaymentMethodDto paymentMethod);
    BaseResponse<PaymentMethodDto> showPaymentMethod(Long orderId);
    //vnpay
    VNPayResponse createVnPayment(HttpServletRequest request);

    //momo
    String createPaymentRequest(String amount);
    String checkPaymentStatus(String orderId);

    // zalopay
    String createOrder(Map<String, Object> orderRequest);
    String getOrderStatus(String appTransId);
}
