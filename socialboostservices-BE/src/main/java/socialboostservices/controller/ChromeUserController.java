package socialboostservices.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import socialboostservices.dto.ChromeUserDTO;
import socialboostservices.mapper.ChromeUserMapper;
import socialboostservices.model.*;
import socialboostservices.repository.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chrome-users")
public class ChromeUserController {
    @Autowired
    ChromeUserRepository chromeUserRepository;
    @Autowired
    GoogleAccountRepository googleAccountRepository;
    @Autowired
    AdsVlogRepository adsVlogRepository;

    @PostMapping
    public ResponseEntity<String> addChromeData(
            @RequestParam(value = "directoryName") String directoryName,
            @RequestParam(value = "googleAccount") String googleAccountEmail,
            @RequestParam(value = "adsVlog") String adsvlogEmail
            ) {
        ChromeUser chromeUser = new ChromeUser();
        GoogleAccount googleAccount = googleAccountRepository.findByEmail(googleAccountEmail).orElse(null);
        AdsVlog adsVlog = adsVlogRepository.findByGoogleAccount(googleAccountRepository.findByEmail(adsvlogEmail).orElse(null)).orElse(null);

        chromeUser.setDirectoryName(directoryName);
        chromeUser.setGoogleAccount(googleAccount);
        chromeUser.setAdsVlog(adsVlog);

        chromeUserRepository.save(chromeUser);
        int maxId = chromeUserRepository.findMaxId();
        return ResponseEntity.ok("Add Chrome user id" + maxId + " successfully");
    }

    @GetMapping("/options")
    public ResponseEntity<Map> getServiceAccounts() {
        Map map = new HashMap<>();
        List googleAccountEmails = new ArrayList<>();
        List adsVlogsEmails = new ArrayList<>();

        List<GoogleAccount> googleAccounts = googleAccountRepository.findAll();
        for (GoogleAccount account : googleAccounts) {
            googleAccountEmails.add(account.getEmail());
        }
        map.put("googleAccounts", googleAccountEmails);

        List<AdsVlog> adsVlogs = adsVlogRepository.findAll();
        for (AdsVlog account : adsVlogs) {
            adsVlogsEmails.add(account.getGoogleAccount().getEmail());
        }
        map.put("adsVlogAccounts", adsVlogsEmails);

        return ResponseEntity.ok(map);
    }
    @GetMapping
    public ResponseEntity<List> getAddChromeData() {
        List<ChromeUser> chromeUsers = chromeUserRepository.findAll();
        List<ChromeUserDTO> chromeUserDTOS = new ArrayList<>();

        for (ChromeUser chromeUser : chromeUsers) {
            chromeUserDTOS.add(ChromeUserMapper.toDTO(chromeUser));
        }

        return ResponseEntity.ok(chromeUserDTOS);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> editChromeData(
            @PathVariable(value = "id") Long id,
            @RequestParam(value = "directoryName") String directoryName,
            @RequestParam(value = "googleAccount") String googleAccountEmail,
            @RequestParam(value = "adsVlog") String adsVlogEmail
    ) {
        ChromeUser c = chromeUserRepository.findById(id).orElse(null);

        if (c == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chrome data id " + id + " not found");

        GoogleAccount googleAccount = googleAccountRepository.findByEmail(googleAccountEmail).orElse(null);
        GoogleAccount adsvlogGoogleAccount = googleAccountRepository.findByEmail(adsVlogEmail).orElse(null);
        AdsVlog adsVlog = adsVlogRepository.findByGoogleAccount(adsvlogGoogleAccount).orElse(null);

        c.setDirectoryName(directoryName);
        c.setGoogleAccount(googleAccount);
        c.setAdsVlog(adsVlog);

        chromeUserRepository.save(c);
        return ResponseEntity.ok("Edit Chrome Data id " + id + " successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteChromeData(
            @PathVariable(value = "id") Long id
    ) {
        ChromeUser c = chromeUserRepository.findById(id).orElse(null);

        if (c == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chrome data id " + id + " not found");

        chromeUserRepository.delete(c);
        return ResponseEntity.ok("Delete Chrome data id " + id + " successfully");
    }
}
