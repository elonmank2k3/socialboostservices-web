package socialboostservices.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import socialboostservices.dto.EasyHits4uDTO;
import socialboostservices.mapper.EasyHits4uMapper;
import socialboostservices.model.EasyHits4u;
import socialboostservices.repository.EasyHits4uRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/easyhits4us")
public class EasyHits4uController {
    @Autowired
    EasyHits4uRepository easyHits4uRepository;

    @PostMapping
    public ResponseEntity<String> createAccount(
            @RequestParam(value = "username") String email,
            @RequestParam(value = "password") String password,
            @RequestParam(value = "cookie") String cookie
    ) {
        EasyHits4u account = new EasyHits4u();
        String username = email.split("@")[0];
        account.setUsername(username);
        account.setPassword(password);
        account.setCookie(cookie);
        account.setSaleEndTime(LocalDateTime.now());

        easyHits4uRepository.save(account);
        return ResponseEntity.ok("EasyHits4u account id " + easyHits4uRepository.findMaxId() + " created successfully!");
    }


    @GetMapping
    public ResponseEntity getAllAccounts() {
        List<EasyHits4u> accounts = easyHits4uRepository.findAll();
        List<EasyHits4uDTO> dtos = new ArrayList<>();
        for (EasyHits4u account : accounts) {
            dtos.add(EasyHits4uMapper.toDTO(account));
        }
        return ResponseEntity.ok(dtos);
    }

    @PutMapping("/{id}")
    public ResponseEntity editAccount(
            @PathVariable(value = "id") Long id,
            @RequestParam(value = "username") String username,
            @RequestParam(value = "password") String password,
            @RequestParam(value = "credit") Integer credit,
            @RequestParam(value = "banner") Integer banner,
            @RequestParam(value = "textAd") Integer textAd,
            @RequestParam(value = "oriPrice") Double oriPrice,
            @RequestParam(value = "percentSale") Integer percentSale,
            @RequestParam(value = "saleEndTime") LocalDateTime saleEndTime,
            @RequestParam(value = "image") String image,
            @RequestParam(value = "buyerInfo") String buyerInfo,
            @RequestParam(value = "cookie") String cookie
    ) {
        EasyHits4u account = easyHits4uRepository.findById(id).orElse(null);

        if (account == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("EasyHits4u account " + id + " not found");

        account.setUsername(username);
        account.setPassword(password);
        account.setCredit(credit);
        account.setBanner(banner);
        account.setTextAd(textAd);
        account.setOriPrice(oriPrice);
        account.setPercentSale(percentSale);
        account.setSaleEndTime(saleEndTime);
        account.setImage(image.getBytes());
        if (buyerInfo.equals("") || buyerInfo == null || buyerInfo.equals("null"))
            account.setBuyerInfo(null);
        else
            account.setBuyerInfo(buyerInfo);
        account.setCookie(cookie);

        easyHits4uRepository.save(account);
        return ResponseEntity.ok("Edit EasyHits4u account " + id + " successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAccount(
            @PathVariable(value = "id") Long id
    ) {
        EasyHits4u account = easyHits4uRepository.findById(id).orElse(null);
        if (account == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("EasyHits4u account " + id + " not found");

        easyHits4uRepository.delete(account);
        return ResponseEntity.ok("Delete EasyHits4u account " + id + " successfully");
    }
}
