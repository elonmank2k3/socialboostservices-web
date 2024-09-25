package socialboostservices.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GoogleAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "VARCHAR(50)", nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(columnDefinition = "VARCHAR(50)")
    private String recoveryEmail;
    @Column(columnDefinition = "VARCHAR(50)")
    private String phoneNumber;
    @OneToOne(mappedBy = "googleAccount")
    private AdsVlog adsVlog;
    @OneToOne(mappedBy = "googleAccount")
    private ChromeUser chromeUser;
}
