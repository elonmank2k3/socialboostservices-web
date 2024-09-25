package socialboostservices.mapper;

import socialboostservices.dto.ChromeUserDTO;
import socialboostservices.model.ChromeUser;

public class ChromeUserMapper {
    public static ChromeUserDTO toDTO (ChromeUser chromeUser) {
        ChromeUserDTO dto = new ChromeUserDTO();

        dto.setId(chromeUser.getId());
        dto.setDirectoryName(chromeUser.getDirectoryName());
        if (chromeUser.getGoogleAccount() == null)
            dto.setGoogleAccount(null);
        else
            dto.setGoogleAccount(chromeUser.getGoogleAccount().getEmail());

        if (chromeUser.getAdsVlog() == null)
            dto.setAdsVlog(null);
        else
            dto.setAdsVlog(chromeUser.getAdsVlog().getGoogleAccount().getEmail());

        return dto;
    }
}
