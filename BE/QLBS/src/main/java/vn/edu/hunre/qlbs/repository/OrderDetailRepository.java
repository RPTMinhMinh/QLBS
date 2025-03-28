package vn.edu.hunre.qlbs.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.hunre.qlbs.entity.OrderDetailEntity;

import java.util.Optional;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetailEntity, Long> {
    @Query("SELECT od FROM OrderDetailEntity od where od.deleted = false and od.orderEntity.id=:orderId")
    Page<OrderDetailEntity> getOrderDetail(Pageable pageable, @Param("orderId") Long orderId);

    @Query(value = "SELECT od FROM OrderDetailEntity od " +
            "JOIN od.orderEntity o " +
            "WHERE o.status = 'Đã giao hàng' AND o.accountEntity.email = :email AND od.bookEntity.id = :bookId")
    Optional<OrderDetailEntity> check(@Param("bookId") Long bookId, @Param("email") String email);

}
