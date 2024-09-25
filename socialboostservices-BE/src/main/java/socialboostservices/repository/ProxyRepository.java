package socialboostservices.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import socialboostservices.model.Proxy;

@Repository
public interface ProxyRepository extends JpaRepository<Proxy, Long> {
    @Query(value = "SELECT MAX(id) FROM proxy", nativeQuery = true)
    Integer findMaxId();
}
