package vn.edu.hunre.qlbs.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.edu.hunre.qlbs.entity.AccountEntity;
import vn.edu.hunre.qlbs.entity.OrderEntity;
import vn.edu.hunre.qlbs.model.dto.OrderDto;
import vn.edu.hunre.qlbs.repository.AccountRepository;

@Component
public class OrderMapper {
    private final AccountRepository accountRepository;

    public OrderMapper(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public OrderEntity toEntity(String email , OrderDto orderDto) {
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setId(orderDto.getId());
        orderEntity.setCode(orderDto.getCode());
        orderEntity.setShipping(orderDto.getShipping());
        orderEntity.setStatus(orderDto.getStatus());
        orderEntity.setTotal(orderDto.getTotal());
        orderEntity.setAddress(orderDto.getAddress());
        AccountEntity account = accountRepository.findByEmail(email).orElse(null);
        orderEntity.setAccountEntity(account);
        return orderEntity;
    }

    public OrderDto toDto(OrderEntity orderEntity) {
        OrderDto orderDto = new OrderDto();
        orderDto.setId(orderEntity.getId());
        orderDto.setCode(orderEntity.getCode());
        orderDto.setShipping(orderEntity.getShipping());
        orderDto.setStatus(orderEntity.getStatus());
        orderDto.setTotal(orderEntity.getTotal());
        orderDto.setAddress(orderEntity.getAddress());
        orderDto.setAccountId(orderEntity.getAccountEntity().getId());
        orderDto.setAccountName(orderEntity.getAccountEntity().getFullname());
        orderDto.setCreateDate(orderEntity.getCreatedDate());
        return orderDto;
    }
}
