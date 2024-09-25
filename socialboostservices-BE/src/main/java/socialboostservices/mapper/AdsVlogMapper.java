package socialboostservices.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import socialboostservices.dto.AdminAdsVlogDTO;
import socialboostservices.dto.AdsVlogDTO;
import socialboostservices.model.AdsVlog;
import socialboostservices.repository.GoogleAccountRepository;

import java.time.Duration;
import java.time.LocalDateTime;

public class AdsVlogMapper {
    public static AdsVlogDTO toDTO(AdsVlog adsVlog) {
        AdsVlogDTO dto = new AdsVlogDTO();

        dto.setServiceName("AdsVlog");
        dto.setId(adsVlog.getId());
        dto.setBalance(adsVlog.getBalance());
        dto.setOriPrice(adsVlog.getOriPrice());


        LocalDateTime currentDateTime = LocalDateTime.now();
        if (currentDateTime.isBefore(adsVlog.getSaleEndTime())) {
            Duration duration = Duration.between(currentDateTime, adsVlog.getSaleEndTime());
            dto.setRemainHours((int) duration.toHours());
            dto.setSoldPrice((double) adsVlog.getOriPrice() * (100 - adsVlog.getPercentSale()) / 100);
        } else {
            dto.setRemainHours(0);
            dto.setSoldPrice((double) adsVlog.getOriPrice());
        }
//        System.out.println("adsVlog.getOriPrice(): " + adsVlog.getOriPrice());
//        System.out.println("dto.getOriPrice(): " + dto.getOriPrice());
//        System.out.println("dto.getSoldPrice(): " + dto.getSoldPrice());

        dto.setPercentSale(adsVlog.getPercentSale());
        dto.setSaleEndTime(adsVlog.getSaleEndTime());
        if (adsVlog.getImage() == null)
            dto.setImage(null);
        else
            dto.setImage(new String(adsVlog.getImage()));
        return dto;
    }

    public static AdminAdsVlogDTO toAdminDTO(AdsVlog adsVlog) {
        AdminAdsVlogDTO dto = new AdminAdsVlogDTO();

        dto.setServiceName("AdsVlog");
        dto.setId(adsVlog.getId());
        dto.setBalance(adsVlog.getBalance());
        dto.setExpectedBalance(adsVlog.getExpectedBalance());
        dto.setOriPrice(adsVlog.getOriPrice());

        LocalDateTime currentDateTime = LocalDateTime.now();
        if (currentDateTime.isBefore(adsVlog.getSaleEndTime())) {
            Duration duration = Duration.between(currentDateTime, adsVlog.getSaleEndTime());
            dto.setRemainHours((int) duration.toHours());
            dto.setSoldPrice((double) adsVlog.getOriPrice() * (100 - adsVlog.getPercentSale()) / 100);
        } else {
            dto.setRemainHours(0);
            dto.setSoldPrice((double) adsVlog.getOriPrice());
        }

        dto.setPercentSale(adsVlog.getPercentSale());
        dto.setSaleEndTime(adsVlog.getSaleEndTime());
        if (adsVlog.getImage() == null)
            dto.setImage(null);
        else
            dto.setImage(new String(adsVlog.getImage()));

        dto.setEmail(adsVlog.getGoogleAccount().getEmail());
        dto.setPassword(adsVlog.getGoogleAccount().getPassword());
        dto.setBuyerInfo(adsVlog.getBuyerInfo());
        dto.setAuthorization(adsVlog.getAuthorization());
        dto.setStatus(adsVlog.getStatus());
        return dto;
    }
}
