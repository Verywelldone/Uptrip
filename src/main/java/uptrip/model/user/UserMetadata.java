package uptrip.model.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@ToString
public class UserMetadata {

    @Id
    private Long id;

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
    private boolean isConfirmed;

    @Column
    private boolean isBanned;

    public UserMetadata() {
        this.lastLogin = getCurrentDate();
        this.createdAt = getCurrentDate();
        this.updatedAt = "";
        this.isConfirmed = false;
        this.isBanned = false;
    }

    private String getCurrentDate() {
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy hh:mm");
        return format.format(new Date());
    }

    @Override
    public String toString() {
        return "UserMetadata{" +
                "UserId" + user.getId() + '\'' +
                "lastLogin='" + lastLogin + '\'' +
                ", createdAt='" + createdAt + '\'' +
                ", updatedAt='" + updatedAt + '\'' +
                ", isConfirmed=" + isConfirmed +
                ", isBanned=" + isBanned +
                '}';
    }
}
