package socialboostservices.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "proxy")
public class Proxy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "host", columnDefinition = "VARCHAR(45)")
    private String host;
    @Column(columnDefinition = "VARCHAR(45)")
    private String port;
    @Column(columnDefinition = "VARCHAR(45)")
    private String username;
    @Column(columnDefinition = "VARCHAR(45)")
    private String password;
    @Column(columnDefinition = "ENUM('HTTP', 'HTTPS', 'SOCKS5')")
    private String protocol;
    @Column(columnDefinition = "ENUM('Public', 'Private', 'Dedicated', 'Shared')")
    private String exclusivity;
    @Column(columnDefinition = "ENUM('Residential', 'Datacenter', 'Mobile', 'ISP')")
    private String origin;
    @Column(columnDefinition = "ENUM('Rotating', 'Static')")
    private String rotation;
    @Column(columnDefinition = "ENUM('IPv4', 'IPv6')")
    private String version;
    @Column(columnDefinition = "ENUM('Active', 'Inactive')")
    private String status;
    @Column(columnDefinition = "VARCHAR(255)")
    private String sellerInfo;
}
