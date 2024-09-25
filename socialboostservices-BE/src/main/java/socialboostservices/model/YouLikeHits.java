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
@Table(name = "youlikehits")
public class YouLikeHits extends BaseAccount {
    @Column(columnDefinition = "VARCHAR(100)", nullable = false)
    private String email;
    @Column(columnDefinition = "VARCHAR(45)", nullable = false)
    private String password;
    @Column(columnDefinition = "INT DEFAULT 0", insertable = false)
    private Integer point;
    @Column(columnDefinition = "INT DEFAULT 0", insertable = false)
    private Integer expectedPoint;
    private String cookie;
}
