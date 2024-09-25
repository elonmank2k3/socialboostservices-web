package socialboostservices.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import socialboostservices.dto.TransactionProofDTO;
import socialboostservices.mapper.TransactionProofMapper;
import socialboostservices.model.TransactionProof;
import socialboostservices.repository.TransactionProofRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/transactionproofs")
public class TransactionProofController {
    @Autowired
    TransactionProofRepository transactionProofRepository;

    @PostMapping
    public ResponseEntity<String> addTransactionProof(
            @RequestParam(value = "image") String image
    ) {
        TransactionProof proof = new TransactionProof();
        proof.setImage(image.getBytes());
        proof.setDate(LocalDate.now());
        transactionProofRepository.save(proof);
        return ResponseEntity.ok("Add transaction proof successfully");
    }

    @GetMapping
    public ResponseEntity<List> getLatestTransactionProofs() {
        List<TransactionProofDTO> proofDTOs = new ArrayList<>();
        List<TransactionProof> transactionProofs = transactionProofRepository.findAll();
        transactionProofs = transactionProofs.subList(transactionProofs.size() - 10, transactionProofs.size());
        for (TransactionProof proof : transactionProofs) {
            proofDTOs.add(TransactionProofMapper.toDTO(proof));
        }
        return ResponseEntity.ok(proofDTOs);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable(value = "id") Long id
    ) {
        TransactionProof transactionProof = transactionProofRepository.findById(id).orElse(null);
        transactionProofRepository.delete(transactionProof);
        return ResponseEntity.ok("Delete image " + id + " successfully");
    }
}
