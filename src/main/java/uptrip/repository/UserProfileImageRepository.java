package uptrip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uptrip.model.user.UserProfileImage;

public interface UserProfileImageRepository extends JpaRepository<UserProfileImage, Integer> {
}
