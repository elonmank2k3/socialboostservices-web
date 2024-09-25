package socialboostservices.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import socialboostservices.dto.AdsVlogDTO;
import socialboostservices.mapper.AdsVlogMapper;
import socialboostservices.model.AdsVlog;
import socialboostservices.model.GoogleAccount;
import socialboostservices.repository.AdsVlogRepository;
import socialboostservices.repository.GoogleAccountRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/adsvlogs")
public class AdsVlogController {
    @Autowired
    GoogleAccountRepository googleAccountRepository;
    @Autowired
    AdsVlogRepository adsVlogRepository;

    @PostMapping
    public ResponseEntity<String> createAccount(
            @RequestParam(value = "email") String email,
            @RequestParam(value = "authorization") String authorization
    ) {
        AdsVlog account = new AdsVlog();
        GoogleAccount googleAccount = googleAccountRepository.findByEmail(email).orElse(null);

        account.setGoogleAccount(googleAccount);
        account.setAuthorization(authorization);
        account.setSaleEndTime(LocalDateTime.now());
        adsVlogRepository.save(account);
        return ResponseEntity.ok("AdsVlog account id " + adsVlogRepository.findMaxId() + " created successfully!");
    }


    @GetMapping
    public ResponseEntity getAllAccounts() {
        List<AdsVlog> accounts = adsVlogRepository.findAll();
        List<AdsVlogDTO> dtos = new ArrayList<>();
        for (AdsVlog account : accounts) {
            dtos.add(AdsVlogMapper.toDTO(account));
        }
        return ResponseEntity.ok(dtos);
    }

    @PutMapping("/{id}")
    public ResponseEntity editAccount(
            @PathVariable(value = "id") Long id,
            @RequestParam(value = "email") String email,
            @RequestParam(value = "balance") Double balance,
            @RequestParam(value = "expectedBalance") Integer expectedBalance,
            @RequestParam(value = "oriPrice") Double oriPrice,
            @RequestParam(value = "percentSale") Integer percentSale,
            @RequestParam(value = "saleEndTime") LocalDateTime saleEndTime,
            @RequestParam(value = "image") String image,
            @RequestParam(value = "buyerInfo", required = false) String buyerInfo,
            @RequestParam(value = "authorization", required = false) String authorization
    ) {
        AdsVlog account = adsVlogRepository.findById(id).orElse(null);
        if (account == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("AdsVlog account " + id + " not found");

        GoogleAccount googleAccount = googleAccountRepository.findByEmail(email).orElse(null);

        account.setGoogleAccount(googleAccount);
        account.setBalance(balance);
        account.setExpectedBalance(expectedBalance);
        account.setOriPrice(oriPrice);
        account.setPercentSale(percentSale);
        account.setSaleEndTime(saleEndTime);
        account.setImage(image.getBytes());
        if (buyerInfo.equals("") || buyerInfo == null || buyerInfo.equals("null"))
            account.setBuyerInfo(null);
        else
            account.setBuyerInfo(buyerInfo);
        account.setAuthorization(authorization);

        adsVlogRepository.save(account);
        return ResponseEntity.ok("Edit AdsVlog account " + id + " successfully");
    }
}