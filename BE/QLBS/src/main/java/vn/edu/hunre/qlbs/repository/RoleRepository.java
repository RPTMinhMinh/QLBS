package vn.edu.hunre.qlbs.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.edu.hunre.qlbs.entity.RoleEntity;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    @Query("SELECT r FROM RoleEntity r WHERE r.deleted = false ")
    Page<RoleEntity> findAll(Pageable pageable);
    RoleEntity findByName(String name);
    Optional<RoleEntity> findByCode(String code);
}
