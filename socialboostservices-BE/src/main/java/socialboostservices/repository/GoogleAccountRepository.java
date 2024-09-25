package socialboostservices.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import socialboostservices.model.GoogleAccount;

import java.util.Optional;

@Repository
public interface GoogleAccountRepository extends JpaRepository<GoogleAccount, Long> {
    @Query(value = "SELECT MAX(id) FROM google_account", nativeQuery = true)
    Integer findMaxId();

    Optional<GoogleAccount> findByEmail(String email);
}
