package uptrip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uptrip.model.user.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
}
