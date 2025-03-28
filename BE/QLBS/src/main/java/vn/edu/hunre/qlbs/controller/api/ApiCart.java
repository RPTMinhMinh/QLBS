package vn.edu.hunre.qlbs.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hunre.qlbs.model.dto.CartDto;
import vn.edu.hunre.qlbs.model.request.UpdateRequest;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;
import vn.edu.hunre.qlbs.service.ICartService;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class ApiCart {
    @Autowired
    private ICartService cartService;

    @PostMapping("/add")
    public ResponseEntity<BaseResponse<CartDto>> addCart(@RequestBody CartDto cartDto) {
        BaseResponse<CartDto> response = cartService.addCart(cartDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getCartByEmail")
    public ResponseEntity<ResponsePage<List<CartDto>>> getCartByEmail(Pageable pageable) {
        ResponsePage<List<CartDto>> response = cartService.getCartByEmail(pageable);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse<CartDto>> updateCart(@PathVariable Long id, @RequestBody UpdateRequest updateRequest) {
        BaseResponse<CartDto> response = cartService.updateCart(id, updateRequest);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse<CartDto>> deleteCart(@PathVariable Long id) {
        BaseResponse<CartDto> response = cartService.deleteCart(id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/deleteCart")
    public ResponseEntity<BaseResponse<Long>> delete(@RequestBody List<Long> ids) {
        BaseResponse<Long> response = cartService.deleteCartByEmail(ids);
        return ResponseEntity.ok(response);
    }
}
