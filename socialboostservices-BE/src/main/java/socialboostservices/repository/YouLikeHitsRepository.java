package socialboostservices.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import socialboostservices.model.YouLikeHits;

import java.util.List;
import java.util.Optional;

@Repository
public interface YouLikeHitsRepository extends JpaRepository<YouLikeHits, Long> {
    @Query(value = "SELECT MAX(id) FROM youlikehits", nativeQuery = true)
    Integer findMaxId();
    @Query(value = "SELECT * FROM youlikehits where status = 'On sale';", nativeQuery = true)
    List<YouLikeHits> findAllAvailableAccounts();
    @Query(value = "SELECT COUNT(*) FROM youlikehits where buyer_info is not null;", nativeQuery = true)
    Integer countSoldAccounts();
    @Query(value = "SELECT COUNT(*) FROM youlikehits where status = 'On sale' and buyer_info is null ;", nativeQuery = true)
    Integer countAvailableAccounts();
}
