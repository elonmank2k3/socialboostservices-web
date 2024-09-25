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
public class ChromeUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "VARCHAR(20)")
    private String directoryName;
    @OneToOne
    @JoinColumn(name = "google_account")
    private GoogleAccount googleAccount;
    @OneToOne
    @JoinColumn(name = "adsvlog")
    private AdsVlog adsVlog;
}
