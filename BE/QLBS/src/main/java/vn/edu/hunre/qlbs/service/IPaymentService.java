package vn.edu.hunre.qlbs.service;

import jakarta.servlet.http.HttpServletRequest;
import vn.edu.hunre.qlbs.model.response.VNPayResponse;

import java.util.Map;

public interface IPaymentService {
    //vnpay
    VNPayResponse createVnPayment(HttpServletRequest request);

    //momo
    String createPaymentRequest(String amount);
    String checkPaymentStatus(String orderId);

    // zalopay
    String createOrder(Map<String, Object> orderRequest);
    String getOrderStatus(String appTransId);
}
