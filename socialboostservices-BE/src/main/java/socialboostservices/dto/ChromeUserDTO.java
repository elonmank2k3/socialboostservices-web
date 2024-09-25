package socialboostservices.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChromeUserDTO {
   private Long id;
   private String directoryName;
   private String googleAccount;
   private String youLikeHits;
   private String easyHits4u;
   private String adsVlog;
}
