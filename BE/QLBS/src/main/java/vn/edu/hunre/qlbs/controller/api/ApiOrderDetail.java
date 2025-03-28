package vn.edu.hunre.qlbs.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hunre.qlbs.model.dto.OrderDetailDto;
import vn.edu.hunre.qlbs.model.dto.PublisherDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;
import vn.edu.hunre.qlbs.service.IOrderDetailService;

import java.util.List;

@RestController
@RequestMapping("/api/order-detail")
public class ApiOrderDetail {
    @Autowired
    private IOrderDetailService orderDetailService;

    @GetMapping("/getOrderDetail/{orderId}")
    public ResponseEntity<ResponsePage<List<OrderDetailDto>>> getOrderDetail(Pageable pageable, @PathVariable Long orderId){
        ResponsePage<List<OrderDetailDto>> responsePage = orderDetailService.getOrderDetail(pageable,orderId);
        return ResponseEntity.ok(responsePage);
    }

    @PostMapping()
    public ResponseEntity<BaseResponse<OrderDetailDto>> create(@RequestBody OrderDetailDto orderDetailDto){
        BaseResponse<OrderDetailDto> response = orderDetailService.addOrderDetail(orderDetailDto);
        return ResponseEntity.ok(response);
    }

}
