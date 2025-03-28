package vn.edu.hunre.qlbs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import vn.edu.hunre.qlbs.model.dto.CategoryRevenueDto;
import vn.edu.hunre.qlbs.model.dto.RevenueByMonthDto;
import vn.edu.hunre.qlbs.model.dto.RevenueByWeekDto;
import vn.edu.hunre.qlbs.model.dto.RevenueByYearDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.repository.OrderRepository;
import vn.edu.hunre.qlbs.service.IRevenueService;
import vn.edu.hunre.qlbs.utils.Constant;

import java.util.List;

@Service
public class IRevenueServiceImpl implements IRevenueService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public BaseResponse<List<CategoryRevenueDto>> getCategoryRevenue() {
        BaseResponse<List<CategoryRevenueDto>> response = new BaseResponse<>();
        List<CategoryRevenueDto> list = orderRepository.getCategoryRevenue();
        response.setData(list);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public BaseResponse<List<RevenueByMonthDto>> getRevenueByMonth() {
        BaseResponse<List<RevenueByMonthDto>> response = new BaseResponse<>();
        List<RevenueByMonthDto> list = orderRepository.revenueByMonth();
        response.setData(list);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public BaseResponse<List<RevenueByWeekDto>> getRevenueByWeek() {
        BaseResponse<List<RevenueByWeekDto>> response = new BaseResponse<>();
        List<RevenueByWeekDto> list = orderRepository.revenueByWeek();
        response.setData(list);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

    @Override
    public BaseResponse<List<RevenueByYearDto>> getRevenueByYear() {
        BaseResponse<List<RevenueByYearDto>> response = new BaseResponse<>();
        List<RevenueByYearDto> list = orderRepository.revenueByYear();
        response.setData(list);
        response.setCode(HttpStatus.OK.value());
        response.setMessage(Constant.HTTP_MESSAGE.SUCCESS);
        return response;
    }

}
