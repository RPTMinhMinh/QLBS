package vn.edu.hunre.qlbs.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.hunre.qlbs.entity.ReviewEntity;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {
    @Query("SELECT r from ReviewEntity r where r.deleted = false")
    Page<ReviewEntity> getAll(Pageable pageable);
    @Query("SELECT r from ReviewEntity r where r.deleted = false and r.bookEntity.id=:bookId")
    Page<ReviewEntity> getAllByBookId(@Param("bookId") Long bookId, Pageable pageable);

    @Query(value = "SELECT r FROM ReviewEntity r " +
            "WHERE r.accountEntity.email = :email AND r.bookEntity.id = :bookId")
    Optional<Boolean> checkHasReview(@Param("email") String email, @Param("bookId") Long bookId);

    @Query("select r from ReviewEntity r where r.deleted = false and r.accountEntity.email = :email and r.id = :id")
    Optional<ReviewEntity> findByIdReview(@Param("email") String email, @Param("id") Long id);

    @Query("select count (r) from ReviewEntity r where r.deleted = false ")
    Long countReview();
}
