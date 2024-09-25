package socialboostservices.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminYouLikeHitsDTO extends YouLikeHitsDTO {
    private String email;
    private String password;
    private Integer expectedPoint;
    private String buyerInfo;
    private String cookie;
    private String status;
}
