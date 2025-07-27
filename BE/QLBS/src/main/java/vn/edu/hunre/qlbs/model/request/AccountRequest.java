package vn.edu.hunre.qlbs.model.request;

import java.util.Set;

public class AccountRequest {
    private String fullname;
    private String phone;
    private Set<Long> roleId;
    private String url;

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Set<Long> getRoleId() {
        return roleId;
    }

    public void setRoleId(Set<Long> roleId) {
        this.roleId = roleId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
