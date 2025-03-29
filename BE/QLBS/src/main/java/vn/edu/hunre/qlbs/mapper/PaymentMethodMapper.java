package vn.edu.hunre.qlbs.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.edu.hunre.qlbs.entity.OrderEntity;
import vn.edu.hunre.qlbs.entity.PaymentEntity;
import vn.edu.hunre.qlbs.model.dto.PaymentMethodDto;
import vn.edu.hunre.qlbs.repository.OrderRepository;

@Component
public class PaymentMethodMapper {
    @Autowired
    private OrderRepository orderRepository;

    public PaymentEntity toEntity(PaymentMethodDto paymentMethod) {
        PaymentEntity paymentEntity = new PaymentEntity();
        paymentEntity.setId(paymentMethod.getId());
        OrderEntity orderEntity = orderRepository.findById(paymentMethod.getOrderId()).orElse(null);
        paymentEntity.setOrderEntity(orderEntity);
        paymentEntity.setPaymentMethod(paymentMethod.getPaymentMethod());
        return paymentEntity;
    }

    public PaymentMethodDto toDto(PaymentEntity paymentEntity) {
        PaymentMethodDto paymentMethod = new PaymentMethodDto();
        paymentMethod.setId(paymentEntity.getId());
        paymentMethod.setOrderId(paymentEntity.getOrderEntity().getId());
        paymentMethod.setPaymentMethod(paymentEntity.getPaymentMethod());
        return paymentMethod;
    }
}
