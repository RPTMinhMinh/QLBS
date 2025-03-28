package vn.edu.hunre.qlbs.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.edu.hunre.qlbs.entity.CartEntity;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Long> {
    @Query("SELECT c from CartEntity c WHERE c.accountEntity.email =:email AND c.bookEntity.id =:bookId AND c.accountEntity.deleted = false")
    Optional<CartEntity> findByEmailAndBookId(String email, Long bookId);
    @Query("SELECT c from CartEntity c WHERE c.accountEntity.email =:email AND c.accountEntity.deleted = false")
    Page<CartEntity> findByEmail(String email , Pageable pageable);
    @Query("select c from CartEntity c where c.accountEntity.email =:email and c.id =:cartId and c.accountEntity.deleted = false ")
    Optional<CartEntity> findByEmailAndCartId(String email,Long cartId);
}
