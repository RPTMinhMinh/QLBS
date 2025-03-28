package vn.edu.hunre.qlbs.model.dto;

import java.math.BigDecimal;

public class RevenueByYearDto {
    private Integer year;
    private Double revenue;

    public RevenueByYearDto(Integer year, Double revenue) {
        this.year = year;
        this.revenue = revenue;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Double getRevenue() {
        return revenue;
    }

    public void setRevenue(Double revenue) {
        this.revenue = revenue;
    }
}
