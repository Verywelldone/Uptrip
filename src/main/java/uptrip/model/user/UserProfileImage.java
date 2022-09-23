package uptrip.model.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "image_table")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileImage {

    @Id
    private int id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_details_id")
    @JsonBackReference
    private UserInfo userInfo;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "picByte", length = 100000000)
    private byte[] picByte;

    public UserProfileImage(String name, String type, byte[] decompressBytes) {
        this.name = name;
        this.type = type;
        this.picByte = decompressBytes;
    }
}
