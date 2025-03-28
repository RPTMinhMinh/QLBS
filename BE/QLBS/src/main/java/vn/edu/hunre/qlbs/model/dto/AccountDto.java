package vn.edu.hunre.qlbs.model.dto;

import java.util.Set;

public class AccountDto {
    private Long id;
    private String fullname;
    private String email;
    private String phone;
    private String address;
    private boolean enabled;
    private Boolean loyalCustomer;
    private Set<RoleDto> roles;
    private Set<Long> roleIds;
    private String imageUrl;
//    private Set<BookDto> bookDtos;
//
//    public Set<BookDto> getBookDtos() {
//        return bookDtos;
//    }
//
//    public void setBookDtos(Set<BookDto> bookDtos) {
//        this.bookDtos = bookDtos;
//    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Long> getRoleIds() {
        return roleIds;
    }

    public void setRoleIds(Set<Long> roleIds) {
        this.roleIds = roleIds;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Boolean getLoyalCustomer() {
        return loyalCustomer;
    }

    public void setLoyalCustomer(Boolean loyalCustomer) {
        this.loyalCustomer = loyalCustomer;
    }

    public Set<RoleDto> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleDto> roles) {
        this.roles = roles;
    }
}
