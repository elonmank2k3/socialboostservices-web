package socialboostservices.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminEasyHits4uDTO extends EasyHits4uDTO {
    private String username;
    private String password;
    private String buyerInfo;
    private String cookie;
    private String status;
}
