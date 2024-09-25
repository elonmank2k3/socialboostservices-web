package socialboostservices.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import socialboostservices.model.ChromeUser;

@Repository
public interface ChromeUserRepository extends JpaRepository<ChromeUser, Long> {
    @Query(value = "SELECT MAX(id) FROM chrome_user", nativeQuery = true)
    Integer findMaxId();
}
