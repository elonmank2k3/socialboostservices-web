package socialboostservices.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
public class BaseAccount {
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
}
