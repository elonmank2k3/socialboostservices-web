package socialboostservices.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import socialboostservices.model.TrafficUp;
import socialboostservices.model.YouLikeHits;

import java.util.List;

@Repository
public interface TrafficUpRepository extends JpaRepository<TrafficUp, Long> {
    @Query(value = "SELECT MAX(id) FROM trafficup", nativeQuery = true)
    Integer findMaxId();
    @Query(value = "SELECT * FROM trafficup where status = 'On sale';", nativeQuery = true)
    List<TrafficUp> findAllAvailableAccounts();
    @Query(value = "SELECT COUNT(*) FROM trafficup where buyer_info is not null;", nativeQuery = true)
    Integer countSoldAccounts();
    @Query(value = "SELECT COUNT(*) FROM trafficup where status = 'On sale' and buyer_info is null", nativeQuery = true)
    Integer countAvailableAccounts();
}
