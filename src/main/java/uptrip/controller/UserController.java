package uptrip.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import uptrip.model.product.ProductItem;
import uptrip.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/favorites/add")
    public void addUserFavoriteProduct(@RequestBody ProductItem productItem) {
        userService.addUserFavoriteProduct(productItem);
    }

    @GetMapping("/favorites/get-all")
    public void getAllUserFavoriteProducts() {
        userService.getAllUserFavoriteProducts();
    }

    @PostMapping("/favorites/remove")
    public void removeUserFavoriteProduct(@RequestBody ProductItem productItem) {
        userService.removeUserFavoriteProduct(productItem);
    }
}
