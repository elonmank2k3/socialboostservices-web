package socialboostservices.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import socialboostservices.dto.GoogleAccountDTO;
import socialboostservices.mapper.GoogleAccountMapper;
import socialboostservices.model.GoogleAccount;
import socialboostservices.repository.GoogleAccountRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/google-accounts")
public class GoogleAccountController {
    @Autowired
    GoogleAccountRepository googleAccountRepository;

    @PostMapping
    public ResponseEntity<String> addGoogleAccount(
            @RequestBody GoogleAccount account) {
        googleAccountRepository.save(account);
        int maxId = googleAccountRepository.findMaxId();
        return ResponseEntity.ok("Create Google account id " + maxId + " successfully");
    }

    @GetMapping
    public ResponseEntity<List> getAllAccounts() {
        List<GoogleAccount> googleAccounts = googleAccountRepository.findAll();
        List<GoogleAccountDTO> dtos = new ArrayList<>();

        for (GoogleAccount account : googleAccounts) {
            dtos.add(GoogleAccountMapper.toDTO(account));
        }
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/emails")
    public ResponseEntity<List> getAllEmails() {
        List<String> emails = new ArrayList<>();
        List<GoogleAccount> googleAccounts = googleAccountRepository.findAll();

        for (GoogleAccount account : googleAccounts) {
            emails.add(account.getEmail());
        }

        return ResponseEntity.ok(emails);
    }
    @PutMapping("/{id}")
    public ResponseEntity<String> editAccount(
            @PathVariable(value = "id") Long id,
            @RequestBody GoogleAccount account
    ) {
        GoogleAccount googleAccount = googleAccountRepository.findById(id).orElse(null);

        if (googleAccount == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Google account id " + id + " not found");

        googleAccount.setEmail(account.getEmail());
        googleAccount.setPassword(account.getPassword());
        googleAccount.setRecoveryEmail(account.getRecoveryEmail());
        googleAccount.setPhoneNumber(account.getPhoneNumber());
        googleAccountRepository.save(googleAccount);

        return ResponseEntity.ok("Update Google account id " + id + " successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAccount(
            @PathVariable(value = "id") Long id
    ) {
        GoogleAccount googleAccount = googleAccountRepository.findById(id).orElse(null);

        if (googleAccount == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Google account id " + id + " not found");

        googleAccountRepository.delete(googleAccount);
        return ResponseEntity.ok("Delete Google account id " + id + " successfully");
    }

    @GetMapping("/max-id")
    public ResponseEntity<Integer> getMaxId() {
        return ResponseEntity.ok(googleAccountRepository.findMaxId());
    }
}
