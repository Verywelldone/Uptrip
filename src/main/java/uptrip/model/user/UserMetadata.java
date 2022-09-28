package uptrip.model.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserMetadata {

    @Id
    private int id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    @JsonBackReference(value = "userMetadata")
    private User user;

    @Column
    private String lastLogin;

    @Column
    private String createdAt;

    @Column
    private String updatedAt;

    @Column
    private Boolean isConfirmed;

    @Column
    private Boolean isBanned;

}
