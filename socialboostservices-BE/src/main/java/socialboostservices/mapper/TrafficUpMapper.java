package socialboostservices.mapper;

import socialboostservices.dto.AdminTrafficUpDTO;
import socialboostservices.dto.TrafficUpDTO;
import socialboostservices.model.TrafficUp;

import java.time.Duration;
import java.time.LocalDateTime;

public class TrafficUpMapper {
    public static TrafficUpDTO toDTO(TrafficUp trafficUp) {
        TrafficUpDTO dto = new TrafficUpDTO();

        dto.setServiceName("TrafficUp");
        dto.setId(trafficUp.getId());
        dto.setPoint(trafficUp.getPoint());
        dto.setOriPrice(trafficUp.getOriPrice());

        LocalDateTime currentDateTime = LocalDateTime.now();
        if (currentDateTime.isBefore(trafficUp.getSaleEndTime())) {
            Duration duration = Duration.between(currentDateTime, trafficUp.getSaleEndTime());
            dto.setRemainHours((int) duration.toHours());
            dto.setSoldPrice((double) trafficUp.getOriPrice() * (100 - trafficUp.getPercentSale()) / 100);
        } else {
            dto.setRemainHours(0);
            dto.setSoldPrice((double) trafficUp.getOriPrice());
        }

        dto.setPercentSale(trafficUp.getPercentSale());
        dto.setSaleEndTime(trafficUp.getSaleEndTime());
        if (trafficUp.getImage() == null)
            dto.setImage(null);
        else
            dto.setImage(new String(trafficUp.getImage()));
        return dto;
    }

    public static AdminTrafficUpDTO toAdminDTO(TrafficUp trafficUp) {
        AdminTrafficUpDTO dto = new AdminTrafficUpDTO();

        dto.setServiceName("TrafficUp");
        dto.setId(trafficUp.getId());
        dto.setPoint(trafficUp.getPoint());
        dto.setExpectedPoint(trafficUp.getExpectedPoint());
        dto.setOriPrice(trafficUp.getOriPrice());

        LocalDateTime currentDateTime = LocalDateTime.now();
        if (currentDateTime.isBefore(trafficUp.getSaleEndTime())) {
            Duration duration = Duration.between(currentDateTime, trafficUp.getSaleEndTime());
            dto.setRemainHours((int) duration.toHours());
            dto.setSoldPrice((double) trafficUp.getOriPrice() * (100 - trafficUp.getPercentSale()) / 100);
        } else {
            dto.setRemainHours(0);
            dto.setSoldPrice((double) trafficUp.getOriPrice());
        }

        dto.setPercentSale(trafficUp.getPercentSale());
        dto.setSaleEndTime(trafficUp.getSaleEndTime());
        if (trafficUp.getImage() == null)
            dto.setImage(null);
        else
            dto.setImage(new String(trafficUp.getImage()));

        dto.setEmail(trafficUp.getEmail());
        dto.setPassword(trafficUp.getPassword());
        dto.setBuyerInfo(trafficUp.getBuyerInfo());
        dto.setStatus(trafficUp.getStatus());
        return dto;
    }
}
