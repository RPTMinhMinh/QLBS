package vn.edu.hunre.qlbs.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.hunre.qlbs.entity.AccountEntity;
import vn.edu.hunre.qlbs.entity.BookEntity;
import vn.edu.hunre.qlbs.entity.OrderEntity;

import java.util.Optional;
@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Long> {
    @Query("SELECT a FROM AccountEntity a where a.deleted = false")
    Page<AccountEntity> getAll(Pageable pageable);
    Optional<AccountEntity> findByEmail(String email);

    @Query("SELECT a.books FROM AccountEntity a WHERE a.email=:email")
    Page<BookEntity> getWishListByEmail(Pageable pageable, @Param(value = "email") String email);

    @Query("SELECT a FROM AccountEntity a JOIN a.roles r WHERE a.deleted = false " +
            "AND (:email IS NULL OR a.email LIKE %:email%) " +
            "AND (:phone IS NULL OR a.phone LIKE %:phone%) " +
            "AND (:roleName IS NULL OR r.name LIKE %:roleName%)")
    Page<AccountEntity> findByCondition(String email, String phone, String roleName, Pageable pageable);

    @Query("SELECT COUNT(a) > 0 FROM AccountEntity a " +
            "JOIN a.orderEntities o " +
            "JOIN o.orderDetailEntities od " +
            "WHERE a.deleted = false AND a.email = :email " +
            "GROUP BY a.id " +
            "HAVING COUNT(o.id) >= 10 AND SUM(od.price * od.quantity) > 2000000")
    Boolean checkOrderCount(@Param("email") String email);

    //select count(*) from accounts where deleted= false;
    @Query("select count (a) from AccountEntity a where a.deleted = false")
    Long countAccount();

}
