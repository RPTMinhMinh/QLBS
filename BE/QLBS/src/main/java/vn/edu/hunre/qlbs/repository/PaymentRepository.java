package vn.edu.hunre.qlbs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.hunre.qlbs.entity.PaymentEntity;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {
    @Query("SELECT p from PaymentEntity p where p.orderEntity.id =:orderId")
    PaymentEntity getPaymentEntity(@Param("orderId") Long orderId);
}
