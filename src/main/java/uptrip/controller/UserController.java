package uptrip.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uptrip.model.product.ProductItem;
import uptrip.model.user.dto.UpdatePasswordDto;
import uptrip.model.user.dto.UserProfileInfoDto;
import uptrip.service.UserService;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
public class UserController {

    private final UserService userService;

    @PostMapping("/favorites/add")
    public void addUserFavoriteProduct(@RequestBody ProductItem productItem) {
        userService.addUserFavoriteProduct(productItem);
    }

    @GetMapping("/favorites/get-all")
    public List<ProductItem> getAllUserFavoriteProducts() {
        return userService.getAllUserFavoriteProducts();
    }

    @PostMapping("/favorites/remove")
    public void removeUserFavoriteProduct(@RequestBody ProductItem productItem) {
        userService.removeUserFavoriteProduct(productItem);
    }

    @PostMapping("/cart/add")
    public void addProductToUserCart(@RequestBody ProductItem productItem) {
        userService.addProductToUserCart(productItem);
    }

    @GetMapping("/cart/get-all")
    public List<ProductItem> getAllUserProductItemsFromCart() {
        return userService.getAllUserProductItemsFromCart();
    }

    @PostMapping("/cart/remove")
    public void removeUserProductFromCart(@RequestBody ProductItem productItem) {
        userService.removeUserProductFromCart(productItem);
    }

    @GetMapping("/profile")
    public ResponseEntity<UserProfileInfoDto> getUserProfileInfo() {
        return userService.getUserProfileInfo();
    }

    @PutMapping("/profile/update")
    public ResponseEntity<UserProfileInfoDto> updateUserProfileInfo(@RequestBody UserProfileInfoDto userProfileInfoDto) {
        return userService.updateUserProfileInfo(userProfileInfoDto);
    }

    @PostMapping("/profile/update-password")
    public ResponseEntity<String> updateUserPassword(@RequestBody UpdatePasswordDto updatePasswordDto) {
        return userService.updateUserPassword(updatePasswordDto);
    }


    @GetMapping("/check")
    public String check() {
        return "OK";
    }
}
