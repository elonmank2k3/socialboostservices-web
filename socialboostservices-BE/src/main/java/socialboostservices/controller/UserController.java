package socialboostservices.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import socialboostservices.dto.*;
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

import java.util.*;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    AdsVlogRepository adsVlogRepository;
    @Autowired
    EasyHits4uRepository easyHits4uRepository;
    @Autowired
    TrafficUpRepository trafficUpRepository;
    @Autowired
    YouLikeHitsRepository youLikeHitsRepository;

    @GetMapping
    public ResponseEntity getAllAccounts(
            @RequestParam(value = "serviceOption") Integer serviceOption,
            @RequestParam(value = "priceOption") Integer priceOption,
            @RequestParam(value = "saleOption") Integer saleOption,
            @RequestParam(value = "currentPage") Integer currentPage
    ) {
        Map map = new HashMap<>();
        List<BaseAccountDTO> baseAccountDTOS = new ArrayList<>();

        switch (serviceOption) {
            case 0: {
                List<YouLikeHits> youLikeHitsList = youLikeHitsRepository.findAllAvailableAccounts();
                for (YouLikeHits account : youLikeHitsList) {
                    baseAccountDTOS.add(YouLikeHitsMapper.toDTO(account));
                }
                List<TrafficUp> trafficUps = trafficUpRepository.findAllAvailableAccounts();
                for (TrafficUp account: trafficUps) {
                    baseAccountDTOS.add(TrafficUpMapper.toDTO(account));
                }
                List<AdsVlog> adsVlogs = adsVlogRepository.findAllAvailableAccounts();
                for (AdsVlog account : adsVlogs) {
                    baseAccountDTOS.add(AdsVlogMapper.toDTO(account));
                }
                List<EasyHits4u> easyHits4us = easyHits4uRepository.findAllAvailableAccounts();
                for (EasyHits4u account : easyHits4us) {
                    baseAccountDTOS.add(EasyHits4uMapper.toDTO(account));
                }
                break;
            }
            case 1: {
                List<YouLikeHits> youLikeHitsList = youLikeHitsRepository.findAllAvailableAccounts();
                for (YouLikeHits account : youLikeHitsList) {
                    baseAccountDTOS.add(YouLikeHitsMapper.toDTO(account));
                }
                break;
            }
            case 2: {
                List<EasyHits4u> easyHits4us = easyHits4uRepository.findAllAvailableAccounts();
                for (EasyHits4u account : easyHits4us) {
                    baseAccountDTOS.add(EasyHits4uMapper.toDTO(account));
                }
                break;
            }
            case 3: {
                List<AdsVlog> adsVlogs = adsVlogRepository.findAllAvailableAccounts();
                for (AdsVlog account : adsVlogs) {
                    baseAccountDTOS.add(AdsVlogMapper.toDTO(account));
                }
                break;
            }
            case 4: {
                List<TrafficUp> trafficUps = trafficUpRepository.findAllAvailableAccounts();
                for (TrafficUp account : trafficUps) {
                    baseAccountDTOS.add(TrafficUpMapper.toDTO(account));
                }
                break;
            }
            default: {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No available service option");
            }
        }

        List<BaseAccountDTO> temp = new ArrayList<>();
        for (BaseAccountDTO account : baseAccountDTOS) {
            if (priceOption != 0 && account.getSoldPrice() > priceOption)
                continue;
            if (saleOption == 0)
                temp.add(account);
            else if (saleOption == 1 && account.getRemainHours() > 0)
                temp.add(account);
            else if (saleOption == 2 && account.getRemainHours() == 0)
                temp.add(account);
        }

        map.put("length", temp.size());
        try {
            if (currentPage <= 0 || (currentPage - 1) * 12 > temp.size()) {
                temp = new ArrayList<>();
            } else {
                temp = temp.subList((currentPage - 1) * 12, currentPage * 12);
            }
        } catch (IndexOutOfBoundsException e) {
            temp = temp.subList((currentPage-1) * 12, temp.size());
        }

        map.put("accounts", temp);
        return ResponseEntity.ok(map);
    }

    @GetMapping("/statistics")
    public ResponseEntity<List> getStatistics() {
        List<Map> statistic = new ArrayList<>();
        Map map = new HashMap<>();
        map.put("name", "YouLikeHits");
        map.put("availableAccountsNum", youLikeHitsRepository.countAvailableAccounts());
        map.put("soldAccountsNum", 18);
        statistic.add(map);

        map = new HashMap<>();
        map.put("name", "EasyHits4u");
        map.put("availableAccountsNum", easyHits4uRepository.countAvailableAccounts());
        map.put("soldAccountsNum", 12);
        statistic.add(map);

        map = new HashMap<>();
        map.put("name", "AdsVlog");
        map.put("availableAccountsNum", adsVlogRepository.countAvailableAccounts());
        map.put("soldAccountsNum", 8);
        statistic.add(map);

        map = new HashMap<>();
        map.put("name", "TrafficUp");
        map.put("availableAccountsNum", trafficUpRepository.countAvailableAccounts());
        map.put("soldAccountsNum", 15);
        statistic.add(map);

        return ResponseEntity.ok(statistic);
    }
}
