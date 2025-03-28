package vn.edu.hunre.qlbs.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.hunre.qlbs.entity.BookEntity;
import vn.edu.hunre.qlbs.entity.OrderEntity;
import vn.edu.hunre.qlbs.model.dto.CategoryRevenueDto;
import vn.edu.hunre.qlbs.model.dto.RevenueByMonthDto;
import vn.edu.hunre.qlbs.model.dto.RevenueByWeekDto;
import vn.edu.hunre.qlbs.model.dto.RevenueByYearDto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    @Query("SELECT o from OrderEntity o where o.deleted = false ")
    Page<OrderEntity> getAll(Pageable pageable);

    @Query("SELECT o from OrderEntity o WHERE o.accountEntity.email =:email")
    Page<OrderEntity> getByEmail(@Param("email") String email, Pageable pageable);

    @Query(value = "SELECT o FROM OrderEntity o WHERE o.deleted=false " +
            "AND (:code IS NULL OR o.code LIKE %:code%)" +
            "AND (:accountName IS NULL OR o.accountEntity.fullname LIKE %:accountName%)" +
            "AND (:status IS NULL OR o.status LIKE %:status%)")
    Page<OrderEntity> findByCondition(String code, String accountName, String status, Pageable pageable);

    @Query("SELECT new vn.edu.hunre.qlbs.model.dto.CategoryRevenueDto(c.name, SUM(od.price * od.quantity)) " +
            "FROM OrderEntity o " +
            "JOIN o.orderDetailEntities od " +
            "JOIN od.bookEntity b " +
            "JOIN b.categoryEntity c " +
            "WHERE o.deleted = false " +
            "GROUP BY c.name")
    List<CategoryRevenueDto> getCategoryRevenue();

    @Query("select count (o) from OrderEntity o where o.status = 'Đã giao hàng' and o.deleted = false ")
    Long countOrder();


    /*


-- tuan
SELECT
    YEAR(o.created_date) AS year,
    WEEK(o.created_date, 1) AS week, -- '1' dùng chuẩn ISO (tuần bắt đầu từ thứ Hai)
    SUM(od.quantity * od.price) AS revenue
FROM orders o
         JOIN order_detail od ON o.id = od.order_id
where o.status = 'Đã giao hàng'
GROUP BY YEAR(o.created_date), WEEK(o.created_date, 1)
ORDER BY year DESC, week DESC;

-- nam
SELECT
    YEAR(o.created_date) AS year,
    SUM(od.quantity * od.price) AS revenue
FROM orders o
         JOIN order_detail od ON o.id = od.order_id
where o.status = 'Đã giao hàng'
GROUP BY YEAR(o.created_date)
ORDER BY year DESC;

    -- thang
SELECT
    YEAR(o.created_date) AS year,
    MONTH(o.created_date) AS month,
    SUM(od.quantity * od.price) AS revenue
FROM orders o
         JOIN order_detail od ON o.id = od.order_id
where o.status = 'Đã giao hàng'
GROUP BY YEAR(o.created_date), MONTH(o.created_date)
ORDER BY year DESC, month DESC;
     */

    @Query("SELECT new vn.edu.hunre.qlbs.model.dto.RevenueByMonthDto( " +
            "YEAR(o.createdDate), MONTH(o.createdDate), SUM(od.quantity * (od.price - b.importPrice))) " +
            "FROM OrderEntity o " +
            "JOIN o.orderDetailEntities od " +
            "JOIN od.bookEntity b " +
            "WHERE o.status = 'Đã giao hàng' " +
            "GROUP BY YEAR(o.createdDate), MONTH(o.createdDate) " +
            "ORDER BY YEAR(o.createdDate) DESC, MONTH(o.createdDate) DESC")
    List<RevenueByMonthDto> revenueByMonth();

    @Query("SELECT new vn.edu.hunre.qlbs.model.dto.RevenueByWeekDto( " +
            "YEAR(o.createdDate), WEEK(o.createdDate), SUM(od.quantity * (od.price - b.importPrice))) " +
            "FROM OrderEntity o " +
            "JOIN o.orderDetailEntities od " +
            "JOIN od.bookEntity b " +
            "WHERE o.status = 'Đã giao hàng' " +
            "GROUP BY YEAR(o.createdDate), WEEK(o.createdDate) " +
            "ORDER BY YEAR(o.createdDate) DESC, WEEK(o.createdDate) DESC")
    List<RevenueByWeekDto> revenueByWeek();

    @Query("SELECT new vn.edu.hunre.qlbs.model.dto.RevenueByYearDto( " +
            "YEAR(o.createdDate), SUM(od.quantity * (od.price - b.importPrice))) " +
            "FROM OrderEntity o " +
            "JOIN o.orderDetailEntities od " +
            "JOIN od.bookEntity b " +
            "WHERE o.status = 'Đã giao hàng' " +
            "GROUP BY YEAR(o.createdDate) " +
            "ORDER BY YEAR(o.createdDate) DESC")
    List<RevenueByYearDto> revenueByYear();


}
