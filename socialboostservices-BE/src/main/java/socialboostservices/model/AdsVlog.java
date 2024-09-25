package socialboostservices.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "adsvlog")
public class AdsVlog extends BaseAccount {
    @OneToOne
    @JoinColumn(name = "google_account", nullable = false)
    private GoogleAccount googleAccount;
    @Column(columnDefinition = "DECIMAL(10,2) DEFAULT 0.00", insertable = false)
    private Double balance;
    @Column(columnDefinition = "INT DEFAULT 0", insertable = false)
    private Integer expectedBalance;
    @Column(columnDefinition = "TEXT")
    private String authorization;
    @OneToOne(mappedBy = "adsVlog")
    private ChromeUser chromeUser;
}