package vn.edu.hunre.qlbs.controller.api;

import jakarta.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
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

    @GetMapping("/exportExcel")
    public void exportToExcel( HttpServletResponse response) throws IOException, FileNotFoundException {
        File file = revenueService.exportToExcel();
        if (file != null){
            response.setContentType("application/octet-stream");
            response.setContentLength((int) file.length());
            response.addHeader("content-disposition", "attachment;filename=" + file.getName() + ".xlsx");

            FileCopyUtils.copy(new FileInputStream(file), response.getOutputStream());
            file.delete();
        }
    }

    @GetMapping("/exportExcelByMonth")
    public void exportToExcelMonth(HttpServletResponse response) throws IOException, FileNotFoundException {
        File file = revenueService.exportToExcelByMonth();
        if (file != null){
            response.setContentType("application/octet-stream");
            response.setContentLength((int) file.length());
            response.addHeader("content-disposition", "attachment;filename=" + file.getName() + ".xlsx");

            FileCopyUtils.copy(new FileInputStream(file), response.getOutputStream());
            file.delete();
        }
    }

    @GetMapping("/exportExcelByWeek")
    public void exportToExcelWeek(HttpServletResponse response) throws IOException, FileNotFoundException {
        File file = revenueService.exportToExcelByWeek();
        if (file != null){
            response.setContentType("application/octet-stream");
            response.setContentLength((int) file.length());
            response.addHeader("content-disposition", "attachment;filename=" + file.getName() + ".xlsx");

            FileCopyUtils.copy(new FileInputStream(file), response.getOutputStream());
            file.delete();
        }
    }

    @GetMapping("/exportExcelByYear")
    public void exportToExcelYear(HttpServletResponse response) throws IOException, FileNotFoundException {
        File file = revenueService.exportToExcelByYear();
        if (file != null){
            response.setContentType("application/octet-stream");
            response.setContentLength((int) file.length());
            response.addHeader("content-disposition", "attachment;filename=" + file.getName() + ".xlsx");

            FileCopyUtils.copy(new FileInputStream(file), response.getOutputStream());
            file.delete();
        }
    }
}
