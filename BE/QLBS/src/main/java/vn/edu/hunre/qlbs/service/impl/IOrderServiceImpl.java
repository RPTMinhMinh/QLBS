package vn.edu.hunre.qlbs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import vn.edu.hunre.qlbs.entity.OrderEntity;
import vn.edu.hunre.qlbs.mapper.OrderMapper;
import vn.edu.hunre.qlbs.model.dto.OrderDto;
import vn.edu.hunre.qlbs.model.dto.auth.AuthDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;
import vn.edu.hunre.qlbs.repository.OrderRepository;
import vn.edu.hunre.qlbs.security.service.JwtService;
import vn.edu.hunre.qlbs.service.IOrderService;
import vn.edu.hunre.qlbs.utils.Constant;
import vn.edu.hunre.qlbs.utils.GenerateCode;

import java.util.List;
import java.util.Optional;

@Service
public class IOrderServiceImpl implements IOrderService {

    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private JwtService jwtService;

    @Override
    public ResponsePage<List<OrderDto>> getAllOrders(Pageable pageable) {
        ResponsePage<List<OrderDto>> responsePage = new ResponsePage<>();
        Page<OrderEntity> orders = orderRepository.getAll(pageable);
        List<OrderDto> orderDtos = orders.getContent().stream().map(orderMapper::toDto).toList();
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(orders.getTotalElements());
        responsePage.setTotalPages(orders.getTotalPages());
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setContent(orderDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<OrderDto> addOrder(OrderDto order) {
        BaseResponse<OrderDto> response = new BaseResponse<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        OrderEntity orderEntity = orderMapper.toEntity(email,order);
        orderEntity.setCode(GenerateCode.generateUniqueCode("O"));
        orderEntity.setDeleted(false);
        orderRepository.save(orderEntity);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(orderMapper.toDto(orderEntity));
        return response;
    }

    @Override
    public BaseResponse<OrderDto> updateOrder(OrderDto order, Long id) {
        BaseResponse<OrderDto> response = new BaseResponse<>();
        Optional<OrderEntity> orderEntity = orderRepository.findById(id);
        if (orderEntity.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("ORDER NOT FOUND");
            return response;
        }
        OrderEntity orderEntity1 = orderEntity.get();
        orderEntity1.setStatus(order.getStatus());
        orderEntity1.setDeleted(false);
        orderRepository.save(orderEntity1);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(orderMapper.toDto(orderEntity1));
        return response;

    }

    @Override
    public BaseResponse<OrderDto> deleteOrder(Long id) {
        BaseResponse<OrderDto> response = new BaseResponse<>();
        Optional<OrderEntity> orderEntity = orderRepository.findById(id);
        if (orderEntity.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("ORDER NOT FOUND");
            return response;
        }
        OrderEntity orderEntity1 = orderEntity.get();
        orderEntity1.setDeleted(true);
        orderRepository.save(orderEntity1);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(orderMapper.toDto(orderEntity1));
        return response;
    }

    @Override
    public BaseResponse<OrderDto> getOrder(Long id) {
        BaseResponse<OrderDto> response = new BaseResponse<>();
        Optional<OrderEntity> orderEntity = orderRepository.findById(id);
        if (orderEntity.isEmpty()) {
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("ORDER NOT FOUND");
            return response;
        }
        OrderEntity orderEntity1 = orderEntity.get();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(orderMapper.toDto(orderEntity1));
        return response;
    }
    @Override
    public ResponsePage<List<OrderDto>> getOrdersByEmail(Pageable pageable) {
        ResponsePage<List<OrderDto>> responsePage = new ResponsePage<>();
        AuthDto authDto = jwtService.decodeToken();
        String email = authDto.getEmail();
        Page<OrderEntity> orderEntities = orderRepository.getByEmail(email, pageable);
        List<OrderDto> orderDtos = orderEntities.getContent().stream().map(orderMapper::toDto).toList();
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(orderEntities.getTotalElements());
        responsePage.setTotalPages(orderEntities.getTotalPages());
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setContent(orderDtos);
        return responsePage;
    }

    @Override
    public ResponsePage<List<OrderDto>> findByCondition(String code, String accountName, String status, Pageable pageable) {
        ResponsePage<List<OrderDto>> responsePage = new ResponsePage<>();
        Page<OrderEntity> orderEntities = orderRepository.findByCondition(code, accountName, status, pageable);
        List<OrderDto> orderDtos = orderEntities.getContent().stream().map(orderMapper::toDto).toList();
        responsePage.setPageSize(pageable.getPageSize());
        responsePage.setTotalElements(orderEntities.getTotalElements());
        responsePage.setTotalPages(orderEntities.getTotalPages());
        responsePage.setPageNumber(pageable.getPageNumber());
        responsePage.setContent(orderDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<Long> countOrder() {
        BaseResponse<Long> response = new BaseResponse<>();
        Long count = orderRepository.countOrder();
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setData(count);
        return response;
    }
}
