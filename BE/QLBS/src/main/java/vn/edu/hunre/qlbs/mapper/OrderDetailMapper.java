package vn.edu.hunre.qlbs.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.edu.hunre.qlbs.entity.BookEntity;
import vn.edu.hunre.qlbs.entity.OrderDetailEntity;
import vn.edu.hunre.qlbs.entity.OrderEntity;
import vn.edu.hunre.qlbs.model.dto.OrderDetailDto;
import vn.edu.hunre.qlbs.repository.BookRepository;
import vn.edu.hunre.qlbs.repository.OrderRepository;

@Component
public class OrderDetailMapper {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private BookMapper bookMapper;
    @Autowired
    private BookRepository bookRepository;

    public OrderDetailEntity toEntity(OrderDetailDto orderDetailDto) {
        OrderDetailEntity orderDetailEntity = new OrderDetailEntity();
        orderDetailEntity.setId(orderDetailDto.getId());
        orderDetailEntity.setQuantity(orderDetailDto.getQuantity());
        orderDetailEntity.setPrice(orderDetailDto.getPrice());
        if (orderDetailDto.getOrderId() != null) {
            OrderEntity orderEntity = orderRepository.findById(orderDetailDto.getOrderId()).orElse(null);
            orderDetailEntity.setOrderEntity(orderEntity);
        }
        BookEntity bookEntity = bookRepository.findById(orderDetailDto.getBookId()).orElse(null);
        orderDetailEntity.setBookEntity(bookEntity);
        return orderDetailEntity;
    }

    public OrderDetailDto toDto(OrderDetailEntity orderDetailEntity) {
        OrderDetailDto orderDetailDto = new OrderDetailDto();
        orderDetailDto.setId(orderDetailEntity.getId());
        orderDetailDto.setQuantity(orderDetailEntity.getQuantity());
        orderDetailDto.setPrice(orderDetailEntity.getPrice());
        orderDetailDto.setOrderId(orderDetailEntity.getOrderEntity().getId());
        orderDetailDto.setBookDto(bookMapper.toDto(orderDetailEntity.getBookEntity()));
        orderDetailDto.setBookId(orderDetailEntity.getBookEntity().getId());
        return orderDetailDto;
    }
}
