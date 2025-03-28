package vn.edu.hunre.qlbs.model.dto;

public class CategoryRevenueDto {
    private String categoryName;
    private Double totalRevenue;


    public CategoryRevenueDto(String categoryName, Double totalRevenue) {
        this.categoryName = categoryName;
        this.totalRevenue = totalRevenue;
    }

    public CategoryRevenueDto() {
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}
