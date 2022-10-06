package uptrip.model.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import uptrip.model.user.User;

@Getter
@NoArgsConstructor
public class UserProfileInfoDto {

    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;

    public UserProfileInfoDto(User user) {
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.firstName = user.getUserInfo().getFirstName();
        this.lastName = user.getUserInfo().getLastName();
        this.phoneNumber = user.getUserInfo().getPhoneNumber();
    }


}
