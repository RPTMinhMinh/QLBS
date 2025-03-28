package vn.edu.hunre.qlbs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.hunre.qlbs.entity.ImageEntity;
@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Long> {
    @Query("SELECT i from ImageEntity i WHERE i.bookEntity.id =:bookId")
    ImageEntity findByBookId(@Param("bookId") Long bookId);
    @Query("SELECT i from ImageEntity i WHERE i.accountEntity.id =:accountId")
    ImageEntity findByAccountId(@Param("accountId") Long accountId);
}
