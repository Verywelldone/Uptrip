package uptrip.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uptrip.model.product.ProductItem;
import uptrip.model.user.User;
import uptrip.model.user.UserInfo;
import uptrip.model.user.dto.UpdatePasswordDto;
import uptrip.model.user.dto.UserProfileInfoDto;
import uptrip.repository.UserInfoRepository;
import uptrip.repository.UserRepository;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
@Slf4j
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;

    private final PasswordEncoder passwordEncoder;

    @NotNull
    private static String getFormattedCurrentDate() {
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy hh:mm");
        return format.format(new Date());
    }

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

            log.info("Found user with id {} and username {} and removing productItem with id {} and name {}", userOptional.get().getId(), userOptional.get().getUsername(), productItem.getId(), productItem.getName());

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

    public ResponseEntity<UserProfileInfoDto> getUserProfileInfo() {
        Optional<User> userOptional = getOptionalUser();
        if (userOptional.isPresent() && userOptional.get().getUserInfo() != null) {
            User user = userOptional.get();
            log.info("Found user with id {} and username {} and returning user profile info", user.getId(), user.getUsername());
            return ResponseEntity.ok(new UserProfileInfoDto(user));
        }
        return ResponseEntity.ok(new UserProfileInfoDto());
    }

    public ResponseEntity<UserProfileInfoDto> updateUserProfileInfo(UserProfileInfoDto userProfileInfoDto) {
        Optional<User> userOptional = getOptionalUser();
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (null == user.getUserInfo()) {
                UserInfo userInfo = new UserInfo();
                userInfo.setUser(user);
                user.setUserInfo(userInfo);
                userInfoRepository.save(userInfo);

            }
            log.info("Found user with id {} and username {} and updating user profile info", user.getId(), user.getUsername());
            user.setUsername(userProfileInfoDto.getUsername());
            user.setEmail(userProfileInfoDto.getEmail());
            user.getUserInfo().setFirstName(userProfileInfoDto.getFirstName());
            user.getUserInfo().setLastName(userProfileInfoDto.getLastName());
            user.getUserInfo().setPhoneNumber(userProfileInfoDto.getPhoneNumber());

            try {
                user.getUserMetadata().setUpdatedAt(getFormattedCurrentDate());

                userRepository.save(user);
                userInfoRepository.save(user.getUserInfo());
            } catch (Exception e) {
                log.error("Error while updating user profile info", e);
                return ResponseEntity.badRequest().build();
            }

            return ResponseEntity.ok(new UserProfileInfoDto(user));
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<String> updateUserPassword(UpdatePasswordDto updatePasswordDto) {
        Optional<User> userOptional = getOptionalUser();
        if (!updatePasswordDto.getNewPassword().equals(updatePasswordDto.getConfirmPassword())) {
            log.info("New password and confirm password are not the same");
            return ResponseEntity.badRequest().body("New password and confirm password do not match");
        }

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (!passwordEncoder.matches(updatePasswordDto.getOldPassword(), user.getPassword())) {
                log.info("Old password is not correct");
                return ResponseEntity.badRequest().body("Old password is not correct");
            }
            user.setPassword(passwordEncoder.encode(updatePasswordDto.getNewPassword()));
            userRepository.save(user);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    public void addProductToUserCart(final ProductItem productItem) {
        Optional<User> userOptional = getOptionalUser();

        if (userOptional.isEmpty()) {
            log.info("User not found");
            return;
        }

        User user = userOptional.get();

        if (!user.getCartProducts().contains(productItem)) {
            log.info("Found user with id {} and username {} and adding productItem with id {} and name {} to cart", user.getId(), user.getUsername(), productItem.getId(), productItem.getName());
            user.getCartProducts().add(productItem);
            userRepository.save(user);
        }
    }

    public List<ProductItem> getAllUserProductItemsFromCart() {
        Optional<User> userOptional = getOptionalUser();
        if (userOptional.isEmpty()) {
            log.info("User not found");
            return Collections.emptyList();
        }
        User user = userOptional.get();
        log.info("Found user with id {} and username {} and returning all products from cart", user.getId(), user.getUsername());

        for (ProductItem productItem : user.getCartProducts()) {
            log.info("ProductItem with id {} and name {}", productItem.getId(), productItem.getName());
        }

        return new ArrayList<>(user.getCartProducts());

    }

    public void removeUserProductFromCart(final ProductItem productItem) {
        Optional<User> userOptional = getOptionalUser();
        (userOptional).ifPresentOrElse(user -> {
            for (Iterator<ProductItem> iterator = user.getCartProducts().iterator(); iterator.hasNext(); ) {
                ProductItem productItem1 = iterator.next();
                if (productItem1.getId().equals(productItem.getId())) {
                    log.info("Found user with id {} and username {} and removing productItem with id {} and name {} from cart", user.getId(), user.getUsername(), productItem.getId(), productItem.getName());
                    iterator.remove();
                    userRepository.save(user);
                }
            }
        }, () -> log.info("User not found"));
    }
}
