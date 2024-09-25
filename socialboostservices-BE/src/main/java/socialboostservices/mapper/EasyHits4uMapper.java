package socialboostservices.mapper;

import socialboostservices.dto.AdminEasyHits4uDTO;
import socialboostservices.dto.EasyHits4uDTO;
import socialboostservices.model.EasyHits4u;

import java.time.Duration;
import java.time.LocalDateTime;

public class EasyHits4uMapper {
    public static EasyHits4uDTO toDTO(EasyHits4u easyHits4u) {
        EasyHits4uDTO dto = new EasyHits4uDTO();

        dto.setServiceName("EasyHits4u");
        dto.setId(easyHits4u.getId());
        dto.setCredit(easyHits4u.getCredit());
        dto.setBanner(easyHits4u.getBanner());
        dto.setTextAd(easyHits4u.getTextAd());
        dto.setOriPrice(easyHits4u.getOriPrice());

        LocalDateTime currentDateTime = LocalDateTime.now();
        if (currentDateTime.isBefore(easyHits4u.getSaleEndTime())) {
            Duration duration = Duration.between(currentDateTime, easyHits4u.getSaleEndTime());
            dto.setRemainHours((int) duration.toHours());
            dto.setSoldPrice((double) easyHits4u.getOriPrice() * (100 - easyHits4u.getPercentSale()) / 100);
        } else {
            dto.setRemainHours(0);
            dto.setSoldPrice((double) easyHits4u.getOriPrice());
        }

        dto.setPercentSale(easyHits4u.getPercentSale());
        dto.setSaleEndTime(easyHits4u.getSaleEndTime());
        if (easyHits4u.getImage() == null)
            dto.setImage(null);
        else
            dto.setImage(new String(easyHits4u.getImage()));
        return dto;
    }

    public static AdminEasyHits4uDTO toAdminDTO(EasyHits4u easyHits4u) {
        AdminEasyHits4uDTO dto = new AdminEasyHits4uDTO();

        dto.setServiceName("EasyHits4u");
        dto.setId(easyHits4u.getId());
        dto.setCredit(easyHits4u.getCredit());
        dto.setBanner(easyHits4u.getBanner());
        dto.setTextAd(easyHits4u.getTextAd());
        dto.setOriPrice(easyHits4u.getOriPrice());

        LocalDateTime currentDateTime = LocalDateTime.now();
        if (currentDateTime.isBefore(easyHits4u.getSaleEndTime())) {
            Duration duration = Duration.between(currentDateTime, easyHits4u.getSaleEndTime());
            dto.setRemainHours((int) duration.toHours());
            dto.setSoldPrice((double) easyHits4u.getOriPrice() * (100 - easyHits4u.getPercentSale()) / 100);
        } else {
            dto.setRemainHours(0);
            dto.setSoldPrice((double) easyHits4u.getOriPrice());
        }

        dto.setPercentSale(easyHits4u.getPercentSale());
        dto.setSaleEndTime(easyHits4u.getSaleEndTime());
        if (easyHits4u.getImage() == null)
            dto.setImage(null);
        else
            dto.setImage(new String(easyHits4u.getImage()));

        dto.setUsername(easyHits4u.getUsername());
        dto.setPassword(easyHits4u.getPassword());
        dto.setBuyerInfo(easyHits4u.getBuyerInfo());
        dto.setCookie(easyHits4u.getCookie());
        dto.setStatus(easyHits4u.getStatus());
        return dto;
    }
}
