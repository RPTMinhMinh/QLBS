package vn.edu.hunre.qlbs.controller.api;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hunre.qlbs.model.dto.PaymentMethodDto;
import vn.edu.hunre.qlbs.model.request.MomoRequest;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.VNPayResponse;
import vn.edu.hunre.qlbs.service.IPaymentService;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class ApiPayment {
    @Autowired
    private IPaymentService paymentService;

    @PostMapping("/create")
    public ResponseEntity<BaseResponse<PaymentMethodDto>> create(@RequestBody PaymentMethodDto paymentMethodDto){
        BaseResponse<PaymentMethodDto> response = paymentService.addPaymentMethod(paymentMethodDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("show-payment-method/{orderId}")
    public ResponseEntity<BaseResponse<PaymentMethodDto>> showPaymentMethod(@PathVariable(value = "orderId") Long orderId){
        BaseResponse<PaymentMethodDto> response = paymentService.showPaymentMethod(orderId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/vn-pay")
    public VNPayResponse pay(HttpServletRequest request) {
        return paymentService.createVnPayment(request);
    }
    @GetMapping("/vnpay_return")
    public ResponseEntity<?> vnpayReturn(@RequestParam Map<String, String> queryParams) {
        String responseCode = queryParams.get("vnp_ResponseCode");
        if ("00".equals(responseCode)) {
            return ResponseEntity.ok(Map.of("status", "00", "message", "Payment success"));
        }
        return ResponseEntity.badRequest().body(Map.of("status", responseCode, "message", "Payment failed"));
    }

    //MOMO
    @PostMapping()
    public ResponseEntity<String> momoPayment(@RequestBody MomoRequest paymentRequest) {
        String response = paymentService.createPaymentRequest(paymentRequest.getAmount());
        return ResponseEntity.ok(response);
    }
    @GetMapping("/order-status/{orderId}")
    public ResponseEntity<String> checkPaymentStatus(@PathVariable String orderId) {
        String response = paymentService.checkPaymentStatus(orderId);
        return ResponseEntity.ok(response);
    }

    //Zalo Pay
    @PostMapping("/create-zalopay")
    public ResponseEntity<String> createPayment(@RequestBody Map<String, Object> orderRequest) {
        try {
            String response = paymentService.createOrder(orderRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @GetMapping("/order-status-zalopay/{appTransId}")
    public ResponseEntity<String> getOrderStatus(@PathVariable String appTransId) {
        String response = paymentService.getOrderStatus(appTransId);
        return ResponseEntity.ok(response);
    }

}

