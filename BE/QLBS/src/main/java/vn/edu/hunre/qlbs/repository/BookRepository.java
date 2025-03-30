package vn.edu.hunre.qlbs.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.hunre.qlbs.entity.BookEntity;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, Long> {
    @Query("SELECT b FROM BookEntity b WHERE b.deleted = false")
    Page<BookEntity> getAllBooks(Pageable pageable);
    @Query("SELECT b FROM BookEntity b WHERE b.deleted = false and " +
            "(:code IS NULL OR b.code LIKE %:code%) AND " +
            "(:name IS NULL OR b.name LIKE %:name%) AND " +
            "(:author IS NULL OR b.author LIKE %:author%) AND " +
            "(:category IS NULL OR b.categoryEntity.id = :category) AND " +
            "(:publisher IS NULL OR b.publisherEntity.id = :publisher)")
    Page<BookEntity> findByCondition(Pageable pageable,
                                     @Param("code") String code,
                                     @Param("name") String name,
                                     @Param("author") String author,
                                     @Param("category") Long category,
                                     @Param("publisher") Long publisher);


    @Query("SELECT b from BookEntity b where b.deleted = false and b.name like %:name%")
    List<BookEntity> findByNameBook(String name);

    @Query("SELECT b, COUNT (od.bookEntity.id) AS count from BookEntity b " +
            "join b.orderDetails od " +
            "GROUP BY od.bookEntity.id, b.id " +
            "ORDER BY count " +
            "DESC LIMIT 8")
    List<BookEntity> bestSellerBook();

    @Query("SELECT b from BookEntity b where b.deleted=false and b.createdDate >=:createDate")
    List<BookEntity> newArrivedBook(LocalDateTime createDate);

    @Query("SELECT b from BookEntity b where b.deleted =false and b.discount >=:discount")
    List<BookEntity> newDiscountedBook(Integer discount);

    @Query("SELECT b FROM BookEntity b WHERE b.deleted=false AND (b.price BETWEEN :minPrice AND :maxPrice)")
    Page<BookEntity> findBookInPriceRange(@Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice, Pageable pageable);

    @Query("select count (b) from BookEntity b where b.deleted = false")
    Long countBooks();
}
