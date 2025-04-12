package vn.edu.hunre.qlbs.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import vn.edu.hunre.qlbs.entity.OrderEntity;
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

    @Override
    public File exportToExcel() {
        File file = null;
        try {
            List<OrderEntity> orderEntities = orderRepository.findAll();
            XSSFWorkbook workbook = new XSSFWorkbook();
            XSSFSheet sheet = workbook.createSheet("Order");
            XSSFRow row = sheet.createRow(0);

            Cell id = row.createCell(0);
            id.setCellValue("id");

            Cell code = row.createCell(1);
            code.setCellValue("code");

            Cell status = row.createCell(2);
            status.setCellValue("status");

            Cell total = row.createCell(3);
            total.setCellValue("total");

            Cell date = row.createCell(4);
            date.setCellValue("date");

            Cell address = row.createCell(5);
            address.setCellValue("address");

            int rowNumber = row.getRowNum();
            for(OrderEntity order : orderEntities) {
                row = sheet.createRow(++rowNumber);
                Cell orderId = row.createCell(0);
                orderId.setCellValue(order.getId());

                Cell orderCode = row.createCell(1);
                orderCode.setCellValue(order.getCode());

                Cell orderStatus = row.createCell(2);
                orderStatus.setCellValue(order.getStatus());

                Cell orderTotal = row.createCell(3);
                orderTotal.setCellValue(order.getTotal().toString());

                Cell orderDate = row.createCell(4);
                orderDate.setCellValue(order.getCreatedDate().toString());

                Cell orderAddress = row.createCell(5);
                orderAddress.setCellValue(order.getAddress());
            }

            sheet.autoSizeColumn(0);
            sheet.autoSizeColumn(1);
            sheet.autoSizeColumn(2);
            sheet.autoSizeColumn(3);
            sheet.autoSizeColumn(4);
            sheet.autoSizeColumn(5);

            final String fileName = "order";
            file = new File(fileName);
            FileOutputStream outputStream = new FileOutputStream(file);

            workbook.write(outputStream);
            outputStream.close();
            workbook.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return file;
    }


    @Override
    public File exportToExcelByMonth() {
        File file = null;
        try {
            List<RevenueByMonthDto> revenueByMonth = orderRepository.revenueByMonth();
            XSSFWorkbook workbook = new XSSFWorkbook();
            XSSFSheet sheet = workbook.createSheet("Order");
            XSSFRow row = sheet.createRow(0);

            Cell year = row.createCell(0);
            year.setCellValue("Năm");

            Cell month = row.createCell(1);
            month.setCellValue("Tháng");

            Cell total = row.createCell(2);
            total.setCellValue("Tổng tiền");

            int rowNumber = row.getRowNum();
            for(RevenueByMonthDto revenue : revenueByMonth) {
                row = sheet.createRow(++rowNumber);
                Cell revenueYear = row.createCell(0);
                revenueYear.setCellValue(revenue.getYear());

                Cell revenueMonth = row.createCell(1);
                revenueMonth.setCellValue(revenue.getMonth());

                Cell revenueTotal = row.createCell(2);
                revenueTotal.setCellValue(revenue.getTotalRevenue().toString());
            }

            sheet.autoSizeColumn(0);
            sheet.autoSizeColumn(1);
            sheet.autoSizeColumn(2);

            final String fileName = "orderByMonth";
            file = new File(fileName);
            FileOutputStream outputStream = new FileOutputStream(file);

            workbook.write(outputStream);
            outputStream.close();
            workbook.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return file;
    }


    @Override
    public File exportToExcelByWeek() {
        File file = null;
        try {
            List<RevenueByWeekDto> revenueByWeek = orderRepository.revenueByWeek();
            XSSFWorkbook workbook = new XSSFWorkbook();
            XSSFSheet sheet = workbook.createSheet("Order");
            XSSFRow row = sheet.createRow(0);

            Cell year = row.createCell(0);
            year.setCellValue("Năm");

            Cell week = row.createCell(1);
            week.setCellValue("Tuần");

            Cell total = row.createCell(2);
            total.setCellValue("Tổng tiền");

            int rowNumber = row.getRowNum();
            for(RevenueByWeekDto revenue : revenueByWeek) {
                row = sheet.createRow(++rowNumber);
                Cell revenueYear = row.createCell(0);
                revenueYear.setCellValue(revenue.getYear());

                Cell revenueWeek = row.createCell(1);
                revenueWeek.setCellValue(revenue.getWeek());

                Cell revenueTotal = row.createCell(2);
                revenueTotal.setCellValue(revenue.getRevenue().toString());
            }

            sheet.autoSizeColumn(0);
            sheet.autoSizeColumn(1);
            sheet.autoSizeColumn(2);

            final String fileName = "orderByWeek";
            file = new File(fileName);
            FileOutputStream outputStream = new FileOutputStream(file);

            workbook.write(outputStream);
            outputStream.close();
            workbook.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return file;
    }

    @Override
    public File exportToExcelByYear() {
        File file = null;
        try {
            List<RevenueByYearDto> revenueByYear = orderRepository.revenueByYear();
            XSSFWorkbook workbook = new XSSFWorkbook();
            XSSFSheet sheet = workbook.createSheet("Order");
            XSSFRow row = sheet.createRow(0);

            Cell year = row.createCell(0);
            year.setCellValue("Năm");

            Cell total = row.createCell(1);
            total.setCellValue("Tổng tiền");

            int rowNumber = row.getRowNum();
            for(RevenueByYearDto revenue : revenueByYear) {
                row = sheet.createRow(++rowNumber);
                Cell revenueYear = row.createCell(0);
                revenueYear.setCellValue(revenue.getYear());

                Cell revenueTotal = row.createCell(1);
                revenueTotal.setCellValue(revenue.getRevenue().toString());
            }

            sheet.autoSizeColumn(0);
            sheet.autoSizeColumn(1);

            final String fileName = "orderByYear";
            file = new File(fileName);
            FileOutputStream outputStream = new FileOutputStream(file);

            workbook.write(outputStream);
            outputStream.close();
            workbook.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return file;
    }

}
