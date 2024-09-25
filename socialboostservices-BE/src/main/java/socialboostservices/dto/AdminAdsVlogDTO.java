package socialboostservices.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminAdsVlogDTO extends AdsVlogDTO {
    private String email;
    private String password;
    private Integer expectedBalance;
    private String buyerInfo;
    private Integer proxyId;
    private String authorization;
    private String status;
}
