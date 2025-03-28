package vn.edu.hunre.qlbs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import vn.edu.hunre.qlbs.entity.OrderDetailEntity;
import vn.edu.hunre.qlbs.mapper.OrderDetailMapper;
import vn.edu.hunre.qlbs.model.dto.OrderDetailDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.model.response.ResponsePage;
import vn.edu.hunre.qlbs.repository.OrderDetailRepository;
import vn.edu.hunre.qlbs.service.IOrderDetailService;
import vn.edu.hunre.qlbs.utils.Constant;

import java.util.List;

@Service
public class IOrderDetailServiceImpl implements IOrderDetailService {
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private OrderDetailMapper orderDetailMapper;
    @Override
    public ResponsePage<List<OrderDetailDto>> getOrderDetail(Pageable pageable, Long orderId) {
        ResponsePage<List<OrderDetailDto>> responsePage = new ResponsePage<>();
        Page<OrderDetailEntity> page = orderDetailRepository.getOrderDetail(pageable, orderId);
        List<OrderDetailDto> orderDetailDtos = page.getContent().stream().map(orderDetailMapper::toDto).toList();
        responsePage.setPageNumber(page.getNumber());
        responsePage.setPageSize(page.getSize());
        responsePage.setTotalElements(page.getTotalElements());
        responsePage.setTotalPages(page.getTotalPages());
        responsePage.setContent(orderDetailDtos);
        return responsePage;
    }

    @Override
    public BaseResponse<OrderDetailDto> addOrderDetail(OrderDetailDto orderDetailDto) {
        BaseResponse<OrderDetailDto> response = new BaseResponse<>();
        OrderDetailEntity orderDetailEntity = orderDetailMapper.toEntity(orderDetailDto);
        orderDetailEntity.setDeleted(false);
        orderDetailRepository.save(orderDetailEntity);
        response.setData(orderDetailMapper.toDto(orderDetailEntity));
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        response.setCode(HttpStatus.OK.value());
        return response;
    }
}
