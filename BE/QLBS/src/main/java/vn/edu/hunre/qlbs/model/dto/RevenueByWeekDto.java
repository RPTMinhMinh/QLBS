package vn.edu.hunre.qlbs.model.dto;

import java.math.BigDecimal;

public class RevenueByWeekDto {
    private Integer year;
    private Integer week;
    private Double revenue;

    public RevenueByWeekDto(Integer year, Integer week, Double revenue) {
        this.year = year;
        this.week = week;
        this.revenue = revenue;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getWeek() {
        return week;
    }

    public void setWeek(Integer week) {
        this.week = week;
    }

    public Double getRevenue() {
        return revenue;
    }

    public void setRevenue(Double revenue) {
        this.revenue = revenue;
    }
}
