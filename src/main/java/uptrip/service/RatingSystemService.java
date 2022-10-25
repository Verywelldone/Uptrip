package uptrip.service;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import uptrip.exception.OrderCreationException;
import uptrip.model.product.ProductItem;
import uptrip.model.product.ProductRating;
import uptrip.model.product.dto.ProductRatingDto;
import uptrip.model.user.User;
import uptrip.repository.ProductRatingRepository;
import uptrip.repository.ProductRepository;
import uptrip.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static uptrip.exception.OrderCreationException.PRODUCT_NOT_FOUND_MESSAGE;

@Service
@AllArgsConstructor
public class RatingSystemService {

    private final UserRepository userRepository;
    private final ProductRatingRepository productRatingRepository;
    private final ProductRepository productRepository;

    public ResponseEntity<List<ProductRatingDto>> getAllServiceRatings(Long productId) {
        List<ProductRatingDto> productRatingDtos = new ArrayList<>();
        List<ProductRating> productRatings = productRatingRepository.getAllByProductId(productId);

        productRatings.forEach(productRating -> {
            User user = getUser(productRating);

            Optional<ProductItem> productItemOpt = productRepository.findById(productId);
            productItemOpt.ifPresent(productItem ->
                    productRatingDtos.add(
                            ProductRatingDto.of(
                                    user.getUserInfo().getFirstName(),
                                    user.getUserInfo().getLastName(),
                                    productRating.getStars(),
                                    productRating.getTitle(),
                                    productRating.getMessage(),
                                    productRating.getDate()
                            )
                    )
            );
        });

        return ResponseEntity.ok(productRatingDtos);
    }


    public ResponseEntity<String> saveRating(ProductRating productRating) {
        if (productRatingRepository.existsByUserIdAndProductId(productRating.getUserId(), productRating.getProductId()))
            return ResponseEntity.badRequest().body("You have already rated this product");
        try {
            checkIfProductExists(productRating.getProductId());
        } catch (OrderCreationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        this.productRatingRepository.save(productRating);
        return ResponseEntity.ok("Rating saved successfully");
    }

    private void checkIfProductExists(Long productId) throws OrderCreationException {
        if (!productRepository.existsById(productId))
            throw new OrderCreationException(PRODUCT_NOT_FOUND_MESSAGE);
    }

    private User getUser(ProductRating productRating) {
        Optional<User> userOpt = userRepository.findById(productRating.getUserId());
        return userOpt.orElse(null);
    }
}
