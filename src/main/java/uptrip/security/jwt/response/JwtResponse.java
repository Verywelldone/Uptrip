package uptrip.security.jwt.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import uptrip.model.user.UserInfo;
import uptrip.model.user.UserMetadata;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class JwtResponse {

    private UserMetadata userMetadata;
    private String token;
    private String type = "Bearer";
    private int id;
    private String username;
    private String email;
    private List<String> roles;
    private UserInfo userInfo;

    public JwtResponse(String token, int id, String username, String email, List<String> roles, UserInfo userInfo, UserMetadata userMetadata) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.userInfo = userInfo;
        this.userMetadata = userMetadata;
    }
}
