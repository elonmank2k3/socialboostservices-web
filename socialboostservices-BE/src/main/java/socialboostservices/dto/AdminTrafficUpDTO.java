package socialboostservices.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AdminTrafficUpDTO extends TrafficUpDTO {
    private String email;
    private String password;
    private Integer expectedPoint;
    private String buyerInfo;
    private String status;
}
