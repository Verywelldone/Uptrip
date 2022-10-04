package uptrip.controller;


import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uptrip.model.product.ProductRating;
import uptrip.model.product.dto.ProductRatingDto;
import uptrip.service.RatingSystemService;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/rating")
public class RatingSystemController {


    private final RatingSystemService ratingSystemService;

    @GetMapping("/get-ratings/{productId}")
    public ResponseEntity<List<ProductRatingDto>> getAllServiceRatings(@PathVariable(value = "productId") Long productId) {
        return ratingSystemService.getAllServiceRatings(productId);
    }

    @PostMapping("/save-rating")
    public ResponseEntity<String> saveRating(@RequestBody ProductRating productRating) {
        return ratingSystemService.saveRating(productRating);
    }

}
