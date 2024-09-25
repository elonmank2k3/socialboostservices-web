package socialboostservices.mapper;

import socialboostservices.dto.AdminYouLikeHitsDTO;
import socialboostservices.dto.YouLikeHitsDTO;
import socialboostservices.model.YouLikeHits;

import java.time.Duration;
import java.time.LocalDateTime;

public class YouLikeHitsMapper {
    public static YouLikeHitsDTO toDTO(YouLikeHits youLikeHits) {
        YouLikeHitsDTO dto = new YouLikeHitsDTO();

        dto.setServiceName("YouLikeHits");
        dto.setId(youLikeHits.getId());
        dto.setPoint(youLikeHits.getPoint());
        dto.setOriPrice(youLikeHits.getOriPrice());

        LocalDateTime currentDateTime = LocalDateTime.now();
        if (currentDateTime.isBefore(youLikeHits.getSaleEndTime())) {
            Duration duration = Duration.between(currentDateTime, youLikeHits.getSaleEndTime());
            dto.setRemainHours((int) duration.toHours());
            dto.setSoldPrice((double) youLikeHits.getOriPrice() * (100-youLikeHits.getPercentSale())/100);
        } else {
            dto.setRemainHours(0);
            dto.setSoldPrice((double) youLikeHits.getOriPrice());
        }

        dto.setPercentSale(youLikeHits.getPercentSale());
        dto.setSaleEndTime(youLikeHits.getSaleEndTime());
        if (youLikeHits.getImage() == null)
            dto.setImage(null);
        else
            dto.setImage(new String(youLikeHits.getImage()));
        return dto;
    }

    public static AdminYouLikeHitsDTO toAdminDTO(YouLikeHits youLikeHits) {
        AdminYouLikeHitsDTO dto = new AdminYouLikeHitsDTO();

        dto.setServiceName("YouLikeHits");
        dto.setId(youLikeHits.getId());
        dto.setPoint(youLikeHits.getPoint());
        dto.setExpectedPoint(youLikeHits.getExpectedPoint());
        dto.setOriPrice(youLikeHits.getOriPrice());

        LocalDateTime currentDateTime = LocalDateTime.now();
        if (currentDateTime.isBefore(youLikeHits.getSaleEndTime())) {
            Duration duration = Duration.between(currentDateTime, youLikeHits.getSaleEndTime());
            dto.setRemainHours((int) duration.toHours());
            dto.setSoldPrice((double) youLikeHits.getOriPrice() * (100-youLikeHits.getPercentSale())/100);
        } else {
            dto.setRemainHours(0);
            dto.setSoldPrice((double) youLikeHits.getOriPrice());
        }

        dto.setPercentSale(youLikeHits.getPercentSale());
        dto.setSaleEndTime(youLikeHits.getSaleEndTime());
        if (youLikeHits.getImage() == null)
            dto.setImage(null);
        else
            dto.setImage(new String(youLikeHits.getImage()));
        dto.setEmail(youLikeHits.getEmail());
        dto.setPassword(youLikeHits.getPassword());
        dto.setBuyerInfo(youLikeHits.getBuyerInfo());
        dto.setCookie(youLikeHits.getCookie());
        dto.setStatus(youLikeHits.getStatus());
        return dto;
    }
}