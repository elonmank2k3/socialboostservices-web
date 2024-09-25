package socialboostservices.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import socialboostservices.dto.YouLikeHitsDTO;
import socialboostservices.mapper.YouLikeHitsMapper;
import socialboostservices.model.YouLikeHits;
import socialboostservices.repository.YouLikeHitsRepository;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/youlikehits")
public class YouLikeHitsController {

   @Autowired
   YouLikeHitsRepository youLikeHitsRepository;

   @PostMapping
   public ResponseEntity<String> createAccount(
           @RequestParam(value = "email") String email,
           @RequestParam(value = "password") String password,
           @RequestParam(value = "cookie") String cookie
   ) {
      YouLikeHits account = new YouLikeHits();
      account.setEmail(email);
      account.setPassword(password);
      account.setPoint(0);
      account.setCookie(cookie);
      account.setSaleEndTime(LocalDateTime.now());

      youLikeHitsRepository.save(account);
      return ResponseEntity.ok("YouLikeHits account id " + youLikeHitsRepository.findMaxId() + " created successfully!");
   }


   @GetMapping
   public ResponseEntity getAllAccounts() {
      List<YouLikeHits> accounts = youLikeHitsRepository.findAll();
      List<YouLikeHitsDTO> dtos = new ArrayList<>();
      for (YouLikeHits account : accounts) {
         dtos.add(YouLikeHitsMapper.toDTO(account));
      }
      return ResponseEntity.ok(dtos);
   }

   @PutMapping("/{id}")
   public ResponseEntity editAccount(
           @PathVariable(value = "id") Long id,
           @RequestParam(value = "email") String email,
           @RequestParam(value = "password") String password,
           @RequestParam(value = "point") Integer point,
           @RequestParam(value = "expectedPoint") Integer expectedPoint,
           @RequestParam(value = "oriPrice") Double oriPrice,
           @RequestParam(value = "percentSale") Integer percentSale,
           @RequestParam(value = "saleEndTime") LocalDateTime saleEndTime,
           @RequestParam(value = "image") String image,
           @RequestParam(value = "buyerInfo", required = false) String buyerInfo,
           @RequestParam(value = "cookie", required = false) String cookie
   ) throws IOException {
      YouLikeHits account = youLikeHitsRepository.findById(id).orElse(null);

      if (account == null)
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("YouLikeHits account " + id + " not found");

      account.setEmail(email);
      account.setPassword(password);
      account.setPoint(point);
      account.setExpectedPoint(expectedPoint);
      account.setOriPrice(oriPrice);
      account.setPercentSale(percentSale);
      account.setSaleEndTime(saleEndTime);
      account.setImage(image.getBytes());
      if (buyerInfo.equals("") || buyerInfo == null || buyerInfo.equals("null"))
         account.setBuyerInfo(null);
      else
         account.setBuyerInfo(buyerInfo);
      account.setCookie(cookie);
      if (cookie.equals("") || cookie == null)
         account.setCookie(null);
      else
         account.setCookie(cookie);
      youLikeHitsRepository.save(account);
      return ResponseEntity.ok("Edit YouLikeHits account " + id + " successfully");
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<String> deleteAccount(
           @PathVariable(value = "id") Long id
   ) {
      YouLikeHits account = youLikeHitsRepository.findById(id).orElse(null);
      if (account == null)
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("EasyHits4u account " + id + " not found");

      youLikeHitsRepository.delete(account);
      return ResponseEntity.ok("Delete EasyHits4u account " + id + " successfully");
   }
}
