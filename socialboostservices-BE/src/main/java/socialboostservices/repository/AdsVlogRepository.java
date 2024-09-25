package socialboostservices.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import socialboostservices.model.AdsVlog;
import socialboostservices.model.GoogleAccount;
import socialboostservices.model.YouLikeHits;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdsVlogRepository extends JpaRepository<AdsVlog, Long> {
    @Query(value = "SELECT MAX(id) FROM adsvlog", nativeQuery = true)
    Integer findMaxId();
    @Query(value = "SELECT * FROM adsvlog where status = 'On sale' and buyer_info is null;", nativeQuery = true)
    List<AdsVlog> findAllAvailableAccounts();
    @Query(value = "SELECT COUNT(*) FROM adsvlog where buyer_info is not null;", nativeQuery = true)
    Integer countSoldAccounts();
    @Query(value = "SELECT COUNT(*) FROM adsvlog where status = 'On sale' and buyer_info is null;", nativeQuery = true)
    Integer countAvailableAccounts();
    Optional<AdsVlog> findByGoogleAccount(GoogleAccount googleAccount);
}
