package socialboostservices.mapper;

import socialboostservices.dto.TransactionProofDTO;
import socialboostservices.model.TransactionProof;

public class TransactionProofMapper {
    public static TransactionProofDTO toDTO(TransactionProof transactionProof) {
        TransactionProofDTO dto = new TransactionProofDTO();
        dto.setId(transactionProof.getId());
        dto.setImage(new String(transactionProof.getImage()));
        dto.setDate(transactionProof.getDate());
        return dto;
    }
}
