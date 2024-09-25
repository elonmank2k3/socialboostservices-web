package socialboostservices.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import socialboostservices.model.TransactionProof;

@Repository
public interface TransactionProofRepository extends JpaRepository<TransactionProof, Long> {
}
