package vn.edu.hunre.qlbs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import vn.edu.hunre.qlbs.entity.BookEntity;
import vn.edu.hunre.qlbs.entity.CartEntity;
import vn.edu.hunre.qlbs.mapper.CartMapper;
import vn.edu.hunre.qlbs.model.dto.CartDto;
import vn.edu.hunre.qlbs.model.dto.auth.AuthDto;
import vn.edu.hunre.qlbs.model.request.UpdateRequest;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;
import vn.edu.hunre.qlbs.repository.BookRepository;
import vn.edu.hunre.qlbs.repository.CartRepository;
import vn.edu.hunre.qlbs.security.service.JwtService;
import vn.edu.hunre.qlbs.service.ICartService;
import vn.edu.hunre.qlbs.utils.Constant;

import java.util.List;
import java.util.Optional;

@Service
public class ICartServiceImpl implements ICartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartMapper cartMapper;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private BookRepository bookRepository;

    @Override
    public BaseResponse<CartDto> addCart(CartDto cartDto) {
        BaseResponse<CartDto> response = new BaseResponse<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        Optional<CartEntity> cart = cartRepository.findByEmailAndBookId(email, cartDto.getBookId());

        if (cart.isEmpty()) {
            // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
            CartEntity cartEntity = cartMapper.toEntity(cartDto, email);
            cartEntity.setDeleted(false);
            cartRepository.save(cartEntity);
            cartDto.setId(cartEntity.getId());
        } else {
            // Nếu sản phẩm đã tồn tại, cập nhật số lượng
            CartEntity existingCart = cart.get();
            existingCart.setQuantity(existingCart.getQuantity() + 1); // Tăng số lượng lên 1
            cartRepository.save(existingCart);
            cartDto.setId(existingCart.getId());
            cartDto.setQuantity(existingCart.getQuantity()); // Cập nhật số lượng trong DTO
        }

        response.setCode(HttpStatus.OK.value());
        response.setData(cartDto);
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }


    @Override
    public BaseResponse<CartDto> updateCart(Long id, UpdateRequest updateRequest) {
        BaseResponse<CartDto> response = new BaseResponse<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        Optional<CartEntity> cart = cartRepository.findByEmailAndBookId(email, id);
        if (cart.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Empty cart");
            return response;
        }

        CartEntity cartEntity = cart.get();
        cartEntity = cartMapper.toEntity(cartEntity, updateRequest);
        cartRepository.save(cartEntity);
        response.setCode(HttpStatus.OK.value());
        response.setData(cartMapper.toDto(cartEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public BaseResponse<CartDto> deleteCart(Long id) {
        BaseResponse<CartDto> response = new BaseResponse<>();
        Optional<CartEntity> cart = cartRepository.findById(id);
        if (cart.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("Empty cart");
            return response;
        }
        cartRepository.delete(cart.get());
        response.setCode(HttpStatus.OK.value());
        response.setData(cartMapper.toDto(cart.get()));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public ResponsePage<List<CartDto>> getCartByEmail(Pageable pageable) {
        ResponsePage<List<CartDto>> responsePage = new ResponsePage<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        Page<CartEntity> carts = cartRepository.findByEmail(email, pageable);
        List<CartDto> cartDtos = carts.stream().map(cartMapper::toDto).toList();
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(carts.getTotalElements());
        responsePage.setTotalPages(carts.getTotalPages());
        responsePage.setContent(cartDtos);
        return responsePage;
    }
    @Override
    public BaseResponse<Long> deleteCartByEmail(List<Long> cartIds) {
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        BaseResponse<Long> response = new BaseResponse<>();

        for (Long cartId : cartIds) {
            Optional<CartEntity> check = cartRepository.findByEmailAndCartId(email,cartId);
            if (check.isEmpty()){
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setMessage(Constant.HTTP_MESSAGE.NOTFOUND);
                return response;
            }

            CartEntity cartEntity = check.get();
            cartRepository.delete(cartEntity);
            BookEntity bookEntity = cartEntity.getBookEntity();
            if (bookEntity != null) {
                bookEntity.setQuantity(bookEntity.getQuantity() - cartEntity.getQuantity());
                bookRepository.save(bookEntity);
            }
        }
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(null);
        return response;
    }

}
