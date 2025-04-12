package vn.edu.hunre.qlbs.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hunre.qlbs.model.dto.OrderDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;
import vn.edu.hunre.qlbs.service.IOrderService;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class ApiOrder {
    @Autowired
    private IOrderService orderService;

    @GetMapping("/list")
    public ResponseEntity<ResponsePage<List<OrderDto>>> getAll(Pageable pageable) {
        ResponsePage<List<OrderDto>> responsePage = orderService.getAllOrders(pageable);
        return ResponseEntity.ok(responsePage);
    }

    @PostMapping("/create")
    public ResponseEntity<BaseResponse<OrderDto>> create(@RequestBody OrderDto OrderDto) {
        BaseResponse<OrderDto> response = orderService.addOrder(OrderDto);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<OrderDto>> update(@PathVariable Long id, @RequestBody OrderDto OrderDto) {
        BaseResponse<OrderDto> response = orderService.updateOrder(OrderDto, id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<OrderDto>> delete(@PathVariable Long id) {
        BaseResponse<OrderDto> response = orderService.deleteOrder(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<BaseResponse<OrderDto>> findById(@PathVariable Long id) {
        BaseResponse<OrderDto> response = orderService.getOrder(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/findOrderByEmail")
    public ResponseEntity<ResponsePage<List<OrderDto>>> getOrderByEmail(Pageable pageable) {
        ResponsePage<List<OrderDto>> responsePage = orderService.getOrdersByEmail(pageable);
        return ResponseEntity.ok(responsePage);
    }

    @GetMapping("/findByCondition")
    public ResponseEntity<ResponsePage<List<OrderDto>>> getOrderByCondition(@RequestParam(value = "code", required = false) String code,
                                                                            @RequestParam(value = "accountName", required = false) String accountName,
                                                                            @RequestParam(value = "status", required = false) String status,
                                                                            Pageable pageable) {
        ResponsePage<List<OrderDto>> responsePage = orderService.findByCondition(code, accountName, status, pageable);
        return ResponseEntity.ok(responsePage);
    }

    @GetMapping("/count-order")
    public ResponseEntity<BaseResponse<Long>> countOrder() {
        BaseResponse<Long> response = orderService.countOrder();
        return ResponseEntity.ok(response);
    }
}
