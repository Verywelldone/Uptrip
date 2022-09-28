package uptrip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uptrip.model.user.UserProfileImage;

import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<UserProfileImage, Integer> {
    Optional<UserProfileImage> findByName(String name);
}
