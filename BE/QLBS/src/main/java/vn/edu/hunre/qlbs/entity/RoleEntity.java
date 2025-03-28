package vn.edu.hunre.qlbs.entity;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
public class RoleEntity extends AbstractEntity{
    private String code;
    private String name;

    @ManyToMany(mappedBy = "roles")
    private Set<AccountEntity> users = new HashSet<>();

    public Set<AccountEntity> getUsers() {
        return users;
    }

    public void setUsers(Set<AccountEntity> users) {
        this.users = users;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
