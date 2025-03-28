package vn.edu.hunre.qlbs.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.edu.hunre.qlbs.entity.PublisherEntity;

@Repository
public interface PublisherRepository extends JpaRepository<PublisherEntity, Long> {
    @Query("SELECT p FROM PublisherEntity p where p.deleted = false")
    Page<PublisherEntity> getAll(Pageable pageable);

}
