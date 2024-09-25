package socialboostservices.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import socialboostservices.dto.BaseAccountDTO;
import socialboostservices.dto.YouLikeHitsDTO;
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

@Service
public class AccountService {
    @Autowired
    YouLikeHitsRepository youLikeHitsRepository;
    @Autowired
    EasyHits4uRepository easyHits4uRepository;
    @Autowired
    AdsVlogRepository adsVlogRepository;
    @Autowired
    TrafficUpRepository trafficUpRepository;

    public List<BaseAccountDTO> getAccountsByServiceOption(Integer serviceOption) {
        switch (serviceOption) {
            case 0:
                return getAllAccounts();
            case 1:
                return getYouLikeHitsAccounts();
            case 2:
                return getEasyHits4uAccounts();
            case 3:
                return getAdsVlogAccounts();
            case 4:
                return getTrafficUpAccounts();
            default:
                return Collections.emptyList();
        }
    }

    private List<BaseAccountDTO> getAllAccounts() {
        List<BaseAccountDTO> dtos = new ArrayList<>();

        dtos.addAll(getYouLikeHitsAccounts());
        dtos.addAll(getTrafficUpAccounts());
        dtos.addAll(getAdsVlogAccounts());
        dtos.addAll(getEasyHits4uAccounts());
        return dtos;
    }
    private List<BaseAccountDTO> getYouLikeHitsAccounts() {
        List<BaseAccountDTO> dtos = new ArrayList<>();
        List<YouLikeHits> accounts = youLikeHitsRepository.findAllAvailableAccounts();
        for (YouLikeHits account : accounts) {
            dtos.add(YouLikeHitsMapper.toDTO(account));
        }
        return dtos;
    }

    private List<BaseAccountDTO> getTrafficUpAccounts() {
        List<BaseAccountDTO> dtos = new ArrayList<>();
        List<TrafficUp> accounts = trafficUpRepository.findAllAvailableAccounts();
        for (TrafficUp account : accounts) {
            dtos.add(TrafficUpMapper.toDTO(account));
        }
        return dtos;
    }

    private List<BaseAccountDTO> getAdsVlogAccounts() {
        List<BaseAccountDTO> dtos = new ArrayList<>();
        List<AdsVlog> accounts = adsVlogRepository.findAllAvailableAccounts();
        for (AdsVlog account : accounts) {
            dtos.add(AdsVlogMapper.toDTO(account));
        }
        return dtos;
    }

    private List<BaseAccountDTO> getEasyHits4uAccounts() {
        List<BaseAccountDTO> dtos = new ArrayList<>();
        List<EasyHits4u> accounts = easyHits4uRepository.findAllAvailableAccounts();
        for (EasyHits4u account : accounts) {
            dtos.add(EasyHits4uMapper.toDTO(account));
        }
        return dtos;
    }

    public List<Map<String, Object>> getStatistics() {
        List<Map<String, Object>> statistics = new ArrayList<>();

        statistics.add(createStatisticMap("YouLikeHits", youLikeHitsRepository.countAvailableAccounts(), youLikeHitsRepository.countSoldAccounts()));
        statistics.add(createStatisticMap("EasyHits4u", easyHits4uRepository.countAvailableAccounts(), easyHits4uRepository.countSoldAccounts()));
        statistics.add(createStatisticMap("AdsVlog", adsVlogRepository.countAvailableAccounts(), adsVlogRepository.countSoldAccounts()));
        statistics.add(createStatisticMap("TrafficUp", trafficUpRepository.countAvailableAccounts(), trafficUpRepository.countSoldAccounts()));

        return statistics;
    }
    private Map<String, Object> createStatisticMap(String name, Integer availableAccountsNum, Integer soldAccountsNum) {
        Map map = new HashMap<>();
        map.put("name", name);
        map.put("availableAccountsNum", availableAccountsNum);
        map.put("soldAccountsNum", soldAccountsNum);
        return map;
    }
}
