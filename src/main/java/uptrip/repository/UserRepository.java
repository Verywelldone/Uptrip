package uptrip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uptrip.model.user.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
}
