package socialboostservices.mapper;

import socialboostservices.dto.GoogleAccountDTO;
import socialboostservices.model.GoogleAccount;

public class GoogleAccountMapper {
    public static GoogleAccountDTO toDTO(GoogleAccount googleAccount) {
        GoogleAccountDTO dto = new GoogleAccountDTO();

        dto.setId(googleAccount.getId());
        dto.setEmail(googleAccount.getEmail());
        dto.setPassword(googleAccount.getPassword());
        dto.setRecoveryEmail(googleAccount.getRecoveryEmail());
        dto.setPhoneNumber(googleAccount.getPhoneNumber());

        return dto;
    }
}
