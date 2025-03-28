package vn.edu.hunre.qlbs.service;

import org.springframework.data.domain.Pageable;
import vn.edu.hunre.qlbs.model.dto.CartDto;
import vn.edu.hunre.qlbs.model.request.UpdateRequest;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;

import java.util.List;

public interface ICartService {
    BaseResponse<CartDto> addCart(CartDto cartDto);
    BaseResponse<CartDto> updateCart(Long id, UpdateRequest updateRequest);
    BaseResponse<CartDto> deleteCart(Long id);
    ResponsePage<List<CartDto>> getCartByEmail(Pageable pageable);
    BaseResponse<Long> deleteCartByEmail(List<Long> cartIds);
}
