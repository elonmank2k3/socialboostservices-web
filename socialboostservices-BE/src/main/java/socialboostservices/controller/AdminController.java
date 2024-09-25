package socialboostservices.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import socialboostservices.mapper.AdsVlogMapper;
import socialboostservices.mapper.EasyHits4uMapper;
import socialboostservices.mapper.TrafficUpMapper;
import socialboostservices.mapper.YouLikeHitsMapper;
import socialboostservices.model.AdsVlog;
import socialboostservices.model.EasyHits4u;
import socialboostservices.model.TrafficUp;
import socialboostservices.model.YouLikeHits;
import socialboostservices.repository.AdsVlogRepository;
import socialboostservices.repository.EasyHits4uRepository;
import socialboostservices.repository.TrafficUpRepository;
import socialboostservices.repository.YouLikeHitsRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    AdsVlogRepository adsVlogRepository;
    @Autowired
    EasyHits4uRepository easyHits4uRepository;
    @Autowired
    TrafficUpRepository trafficUpRepository;
    @Autowired
    YouLikeHitsRepository youLikeHitsRepository;


    @GetMapping("/accounts")
    public ResponseEntity getAllAccounts(
            @RequestParam(value = "service-option") Integer serviceOption
    ) {
        List accounts = new ArrayList<>();

        switch (serviceOption) {
            case 0: {
                List<AdsVlog> adsVlogs = adsVlogRepository.findAll();
                for (AdsVlog adsVlog : adsVlogs) {
                    accounts.add(AdsVlogMapper.toAdminDTO(adsVlog));
                }
                List<EasyHits4u> easyHits4us = easyHits4uRepository.findAll();
                for (EasyHits4u easyHits4u : easyHits4us) {
                    accounts.add(EasyHits4uMapper.toAdminDTO(easyHits4u));
                }
                List<TrafficUp> trafficUps = trafficUpRepository.findAll();
                for (TrafficUp trafficUp : trafficUps) {
                    accounts.add(TrafficUpMapper.toAdminDTO(trafficUp));
                }
                List<YouLikeHits> youLikeHitsList = youLikeHitsRepository.findAll();
                for (YouLikeHits youLikeHits : youLikeHitsList) {
                    accounts.add(YouLikeHitsMapper.toAdminDTO(youLikeHits));
                }
                return ResponseEntity.ok(accounts);
            }
            case 1: {
                List<YouLikeHits> youLikeHitsList = youLikeHitsRepository.findAll();
                for (YouLikeHits youLikeHits : youLikeHitsList) {
                    accounts.add(YouLikeHitsMapper.toAdminDTO(youLikeHits));
                }
                return ResponseEntity.ok(accounts);
            }
            case 2: {
                List<EasyHits4u> easyHits4us = easyHits4uRepository.findAll();
                for (EasyHits4u easyHits4u : easyHits4us) {
                    accounts.add(EasyHits4uMapper.toAdminDTO(easyHits4u));
                }
                return ResponseEntity.ok(accounts);
            }
            case 3: {
                List<AdsVlog> adsVlogs = adsVlogRepository.findAll();
                for (AdsVlog adsVlog : adsVlogs) {
                    accounts.add(AdsVlogMapper.toAdminDTO(adsVlog));
                }
                return ResponseEntity.ok(accounts);
            }
            case 4: {
                List<TrafficUp> trafficUps = trafficUpRepository.findAll();
                for (TrafficUp trafficUp : trafficUps) {
                    accounts.add(TrafficUpMapper.toAdminDTO(trafficUp));
                }
                return ResponseEntity.ok(accounts);
            }
            default: {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No available service option");
            }
        }
    }

    @PostMapping("/edit-status")
    public ResponseEntity handleStatus(
            @RequestParam(value = "serviceOption") Integer serviceOption,
            @RequestParam(value = "id") Long id,
            @RequestParam(value = "status") String status
    ) {

        if (!(status.equalsIgnoreCase("On sale") || status.equalsIgnoreCase("In progress") ||
                status.equalsIgnoreCase("In stock")))
            return ResponseEntity.ok("Status is not valid: " + status);

        switch (serviceOption) {
            case 1: {
                YouLikeHits account = youLikeHitsRepository.findById(id).orElse(null);
                account.setStatus(toCapitalCase(status));
                youLikeHitsRepository.save(account);
                return ResponseEntity.ok("YouLikeHits account " + id + " status becomes " + account.getStatus());
            }
            case 2: {
                EasyHits4u account = easyHits4uRepository.findById(id).orElse(null);
                account.setStatus(toCapitalCase(status));
                easyHits4uRepository.save(account);
                return ResponseEntity.ok("EasyHits4u account " + id + " status becomes " + account.getStatus());
            }
            case 3: {
                AdsVlog account = adsVlogRepository.findById(id).orElse(null);
                account.setStatus(toCapitalCase(status));
                adsVlogRepository.save(account);
                return ResponseEntity.ok("AdsVlog account " + id + " status becomes " + account.getStatus());
            }
            case 4: {
                TrafficUp account = trafficUpRepository.findById(id).orElse(null);
                account.setStatus(toCapitalCase(status));
                trafficUpRepository.save(account);
                return ResponseEntity.ok("TrafficUp account " + id + " status becomes " + account.getStatus());
            }
            default: {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No available service option");
            }
        }
    }

    @GetMapping("/max-id")
    public ResponseEntity<Integer> getMaxId(
            @RequestParam(value = "service-option") int serviceOption
    ) {
        switch (serviceOption) {
            case 1: {
                return ResponseEntity.ok(youLikeHitsRepository.findMaxId());
            }
            case 2: {
                if (easyHits4uRepository.findMaxId() == null)
                    return ResponseEntity.ok(0);
                else
                    return ResponseEntity.ok(easyHits4uRepository.findMaxId());
            }
            case 3: {
                if (adsVlogRepository.findMaxId() == null)
                    return ResponseEntity.ok(0);
                else
                    return ResponseEntity.ok(adsVlogRepository.findMaxId());
            }
            case 4: {
                if (trafficUpRepository.findMaxId() == null)
                    return ResponseEntity.ok(0);
                else
                    return ResponseEntity.ok(trafficUpRepository.findMaxId());
            }
        }
        return null;
    }

    private String toCapitalCase(String text) {
        text = text.toLowerCase();
        return String.valueOf(text.charAt(0)).toUpperCase() + text.substring(1);
    }
}