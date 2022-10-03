package uptrip.model.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "user_info")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    @JsonBackReference(value = "userInfo")
    private User user;

    @Column
    private String firstName = "";

    @Column
    private String lastName = "";

    @Column
    private String phoneNumber = "";

    @Column
    private String city = "";

    @Column
    private String address = "";

}
