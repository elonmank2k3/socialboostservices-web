package socialboostservices.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import socialboostservices.dto.TrafficUpDTO;
import socialboostservices.mapper.TrafficUpMapper;
import socialboostservices.model.TrafficUp;
import socialboostservices.repository.TrafficUpRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/trafficups")
public class TrafficUpController {

   @Autowired
   TrafficUpRepository trafficUpRepository;

   @PostMapping
   public ResponseEntity<String> createAccount(
           @RequestParam(value = "email") String email,
           @RequestParam(value = "password") String password
   ) {
      TrafficUp account = new TrafficUp();
      account.setEmail(email);
      account.setPassword(password);
      account.setSaleEndTime(LocalDateTime.now());

      trafficUpRepository.save(account);
      return ResponseEntity.ok("TrafficUp account id " + trafficUpRepository.findMaxId() + " created successfully!");
   }


   @GetMapping
   public ResponseEntity getAllAccounts() {
      List<TrafficUp> accounts = trafficUpRepository.findAll();
      List<TrafficUpDTO> dtos = new ArrayList<>();
      for (TrafficUp account : accounts) {
         dtos.add(TrafficUpMapper.toDTO(account));
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
           @RequestParam(value = "buyerInfo", required = false) String buyerInfo
   ) {
      TrafficUp account = trafficUpRepository.findById(id).orElse(null);

      if (account == null)
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Traffic account " + id + " not found");

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
      trafficUpRepository.save(account);
      return ResponseEntity.ok("Edit TrafficUp account " + id + " successfully");
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<String> deleteAccount(
           @PathVariable(value = "id") Long id
   ) {
      TrafficUp account = trafficUpRepository.findById(id).orElse(null);
      if (account == null)
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("EasyHits4u account " + id + " not found");

      trafficUpRepository.delete(account);
      return ResponseEntity.ok("Delete EasyHits4u account " + id + " successfully");
   }
}
