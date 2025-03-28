package vn.edu.hunre.qlbs.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.edu.hunre.qlbs.entity.AccountEntity;
import vn.edu.hunre.qlbs.entity.BookEntity;
import vn.edu.hunre.qlbs.entity.CartEntity;
import vn.edu.hunre.qlbs.model.dto.BookDto;
import vn.edu.hunre.qlbs.model.dto.CartDto;
import vn.edu.hunre.qlbs.model.request.UpdateRequest;
import vn.edu.hunre.qlbs.repository.AccountRepository;
import vn.edu.hunre.qlbs.repository.BookRepository;
@Component
public class CartMapper {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private BookMapper bookMapper;
    public CartEntity toEntity(CartDto cartDto, String email){
        CartEntity cartEntity = new CartEntity();
        cartEntity.setId(cartDto.getId());
        cartEntity.setQuantity(cartDto.getQuantity());
        BookEntity bookEntity = bookRepository.findById(cartDto.getBookId()).orElse(null);
        if(bookEntity != null){
            cartEntity.setBookEntity(bookEntity);
        }
        AccountEntity accountEntity = accountRepository.findByEmail(email).orElse(null);
        if(accountEntity != null){
            cartEntity.setAccountEntity(accountEntity);
        }
        return cartEntity;
    }
    public CartDto toDto(CartEntity cartEntity){
        CartDto cartDto = new CartDto();
        cartDto.setId(cartEntity.getId());
        cartDto.setQuantity(cartEntity.getQuantity());
        cartDto.setBookId(cartEntity.getBookEntity().getId());
        cartDto.setBookDto(bookMapper.toDto(cartEntity.getBookEntity()));
        return cartDto;
    }
    public CartEntity toEntity(CartEntity cartEntity, UpdateRequest updateRequest){
        cartEntity.setQuantity(updateRequest.getQuantity());
        return cartEntity;
    }
}
