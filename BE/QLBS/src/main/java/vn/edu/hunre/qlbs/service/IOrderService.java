package vn.edu.hunre.qlbs.service;

import org.springframework.data.domain.Pageable;
import vn.edu.hunre.qlbs.model.dto.OrderDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;

import java.util.List;

public interface IOrderService {
    ResponsePage<List<OrderDto>> getAllOrders(Pageable pageable);
    BaseResponse<OrderDto> addOrder(OrderDto order);
    BaseResponse<OrderDto> updateOrder(OrderDto order, Long id);
    BaseResponse<OrderDto> deleteOrder(Long id);
    BaseResponse<OrderDto> getOrder(Long id);
    ResponsePage<List<OrderDto>> getOrdersByEmail(Pageable pageable);
    ResponsePage<List<OrderDto>> findByCondition(String code, String accountName,String status, Pageable pageable);
    BaseResponse<Long> countOrder();
}
