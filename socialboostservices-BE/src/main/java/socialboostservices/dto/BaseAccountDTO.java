package socialboostservices.dto;

import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass // marks the class as a superclass that other entities can inherit from
public class BaseAccountDTO {
    private String serviceName;
    private Long id;
    private Double oriPrice;
    private Double soldPrice;
    private Integer percentSale;
    private LocalDateTime saleEndTime;
    private Integer remainHours;
    private String image;
    private String status;
}
