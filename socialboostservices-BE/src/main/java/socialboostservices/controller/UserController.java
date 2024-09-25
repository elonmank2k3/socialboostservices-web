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
import socialboostservices.service.AccountService;

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
    @Autowired
    AccountService accountService;

    @GetMapping
    public ResponseEntity getAllAccounts(
            @RequestParam(value = "serviceOption") Integer serviceOption,
            @RequestParam(value = "priceOption") Integer priceOption,
            @RequestParam(value = "saleOption") Integer saleOption,
            @RequestParam(value = "currentPage") Integer currentPage
    ) {
        Map map = new HashMap<>();
        List<BaseAccountDTO> accounts = accountService.getAccountsByServiceOption(serviceOption);

        List<BaseAccountDTO> temp = new ArrayList<>();
        for (BaseAccountDTO account : accounts) {
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
        int pageSize = 12;
        try {
            if (currentPage <= 0 || (currentPage - 1) * pageSize > temp.size()) {
                temp = new ArrayList<>();
            } else {
                temp = temp.subList((currentPage - 1) * pageSize, currentPage * pageSize);
            }
        } catch (IndexOutOfBoundsException e) {
            temp = temp.subList((currentPage-1) * pageSize, temp.size());
        }

        map.put("accounts", temp);
        return ResponseEntity.ok(map);
    }

    @GetMapping("/statistics")
    public ResponseEntity<List> getStatistics() {
        return ResponseEntity.ok(accountService.getStatistics());
    }
}
