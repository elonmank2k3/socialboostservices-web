package socialboostservices.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import socialboostservices.model.EasyHits4u;
import socialboostservices.model.YouLikeHits;

import java.util.List;
import java.util.Optional;

@Repository
public interface EasyHits4uRepository extends JpaRepository<EasyHits4u, Long> {
    @Query(value = "SELECT MAX(id) FROM easyhits4u", nativeQuery = true)
    Integer findMaxId();
    @Query(value = "SELECT * FROM easyhits4u where status = 'On sale';", nativeQuery = true)
    List<EasyHits4u> findAllAvailableAccounts();
    @Query(value = "SELECT COUNT(*) FROM easyhits4u where buyer_info is not null;", nativeQuery = true)
    Integer countSoldAccounts();
    @Query(value = "SELECT COUNT(*) FROM easyhits4u where status = 'On sale' and buyer_info is null;", nativeQuery = true)
    Integer countAvailableAccounts();
    Optional<EasyHits4u> findByUsername(String username);
}
