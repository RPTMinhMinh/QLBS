package vn.edu.hunre.qlbs.service;

import java.io.File;
import vn.edu.hunre.qlbs.model.dto.CategoryRevenueDto;
import vn.edu.hunre.qlbs.model.dto.RevenueByMonthDto;
import vn.edu.hunre.qlbs.model.dto.RevenueByWeekDto;
import vn.edu.hunre.qlbs.model.dto.RevenueByYearDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;

import java.util.List;

public interface IRevenueService {
    BaseResponse<List<CategoryRevenueDto>> getCategoryRevenue();
    BaseResponse<List<RevenueByMonthDto>> getRevenueByMonth();
    BaseResponse<List<RevenueByWeekDto>> getRevenueByWeek();
    BaseResponse<List<RevenueByYearDto>> getRevenueByYear();
    File exportToExcel();
    File exportToExcelByMonth();
    File exportToExcelByWeek();
    File exportToExcelByYear();
}
