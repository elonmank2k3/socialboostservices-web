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
@Table(name = "easyhits4u")
public class EasyHits4u extends BaseAccount {
    @Column(columnDefinition = "VARCHAR(45)", nullable = false)
    private String username;
    @Column(columnDefinition = "VARCHAR(45)", nullable = false)
    private String password;
    @Column(columnDefinition = "INT DEFAULT 0", insertable = false)
    private Integer credit;
    @Column(columnDefinition = "INT DEFAULT 0", insertable = false)
    private Integer banner;
    @Column(name = "text_ad", columnDefinition = "INT DEFAULT 0", insertable = false)
    private Integer textAd;
    @Column(columnDefinition = "DECIMAL(10,2) DEFAULT 0.00", insertable = false)
    private Double expectedCredit;
    @Column(columnDefinition = "INT DEFAULT 0", insertable = false)
    private Integer expectedBanner;
    @Column(name = "expected_text_ad", columnDefinition = "INT DEFAULT 0", insertable = false)
    private Integer expectedTextAd;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "ori_price", columnDefinition = "DECIMAL(10,2) DEFAULT 0", insertable = false)
    private Double oriPrice;
    @Column(name = "percent_sale", columnDefinition = "INT DEFAULT 0", insertable = false)
    private Integer percentSale;
    @Column(name = "sale_end_time", columnDefinition = "DATETIME")
    private LocalDateTime saleEndTime;
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;
    @Column(name = "buyer_info", columnDefinition = "VARCHAR(255)")
    private String buyerInfo;
    @Column(columnDefinition = "ENUM('On sale', 'In progress', 'In stock') DEFAULT 'In stock'", insertable = false)
    private String status;
    public String getStatus() {
        return status;
    }
    @Column(columnDefinition = "TEXT")
    private String cookie;
}