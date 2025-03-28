package vn.edu.hunre.qlbs.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.hunre.qlbs.model.dto.CategoryRevenueDto;
import vn.edu.hunre.qlbs.model.dto.RevenueByMonthDto;
import vn.edu.hunre.qlbs.model.dto.RevenueByWeekDto;
import vn.edu.hunre.qlbs.model.dto.RevenueByYearDto;
import vn.edu.hunre.qlbs.model.response.BaseResponse;
import vn.edu.hunre.qlbs.service.IRevenueService;

import java.util.List;

@RestController
@RequestMapping("/api/revenue")
public class ApiRevenue {
    private IRevenueService revenueService;

    public ApiRevenue(IRevenueService revenueService) {
        this.revenueService = revenueService;
    }

    @GetMapping("/list")
    public ResponseEntity<BaseResponse<List<CategoryRevenueDto>>> getAllRevenue() {
        BaseResponse<List<CategoryRevenueDto>> response = revenueService.getCategoryRevenue();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/revenue-by-month")
    public ResponseEntity<BaseResponse<List<RevenueByMonthDto>>> revenueByMonth() {
        BaseResponse<List<RevenueByMonthDto>> response = revenueService.getRevenueByMonth();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/revenue-by-week")
    public ResponseEntity<BaseResponse<List<RevenueByWeekDto>>> revenueByWeek() {
        BaseResponse<List<RevenueByWeekDto>> response = revenueService.getRevenueByWeek();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/revenue-by-year")
    public ResponseEntity<BaseResponse<List<RevenueByYearDto>>> revenueByYear() {
        BaseResponse<List<RevenueByYearDto>> response = revenueService.getRevenueByYear();
        return ResponseEntity.ok(response);
    }
}
