package vn.edu.hunre.qlbs.model.dto;

public class RevenueByMonthDto {
    private Integer year;
    private Integer month;
    private Double totalRevenue;

    // ** Add this constructor to match the query **
    public RevenueByMonthDto(Integer year, Integer month, Double totalRevenue) {
        this.year = year;
        this.month = month;
        this.totalRevenue = totalRevenue;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}
