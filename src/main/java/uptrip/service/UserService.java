package uptrip.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import uptrip.model.product.ProductItem;
import uptrip.model.user.User;
import uptrip.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void addUserFavoriteProduct(final ProductItem productItem) {
        Optional<User> userOptional = getOptionalUser();
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (!user.getFavoriteProducts().contains(productItem)) {
                log.info("Found user with id {} and username {} and adding productItem with id {} and name {}", user.getId(), user.getUsername(), productItem.getId(), productItem.getName());
                user.getFavoriteProducts().add(productItem);
                userRepository.save(user);
            }
        }
    }


    public List<ProductItem> getAllUserFavoriteProducts() {
        Optional<User> userOptional = getOptionalUser();
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            log.info("Found user with id {} and username {} and returning all favorite products", user.getId(), user.getUsername());
            return new ArrayList<>(user.getFavoriteProducts());
        }
        return null;
    }

    public void removeUserFavoriteProduct(final ProductItem productItem) {
        Optional<User> userOptional = getOptionalUser();
        if (userOptional.isPresent()) {

            log.info("Found user with id {} and username {} and removing productItem with id {} and name {}",
                    userOptional.get().getId(),
                    userOptional.get().getUsername(),
                    productItem.getId(),
                    productItem.getName());

            User user = userOptional.get();
            user.getFavoriteProducts().remove(productItem);
            userRepository.save(user);
        }
    }


    private Optional<User> getOptionalUser() {
        String username;

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        return userRepository.findByUsername(username);
    }

}
