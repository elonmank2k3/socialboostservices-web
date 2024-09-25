package socialboostservices.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GoogleAccountDTO {
    private Long id;
    private String email;
    private String password;
    private String recoveryEmail;
    private String phoneNumber;
}
