package vn.edu.hunre.qlbs.service;

import org.springframework.data.domain.Pageable;
import vn.edu.hunre.qlbs.model.dto.OrderDetailDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;

import java.util.List;

public interface IOrderDetailService {
    ResponsePage<List<OrderDetailDto>> getOrderDetail(Pageable pageable, Long orderId);
    BaseResponse<OrderDetailDto> addOrderDetail(OrderDetailDto orderDetailDto);
}
