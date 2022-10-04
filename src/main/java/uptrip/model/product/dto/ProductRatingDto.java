package uptrip.model.product.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import uptrip.model.product.ProductItem;
import uptrip.model.product.ProductRating;
import uptrip.model.user.UserInfo;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@Builder
public class ProductRatingDto implements Serializable {
    private transient UserInfo user;
    private transient ProductItem product;

    private int stars;
    private String message;
    private LocalDate date;


    public static ProductRatingDto of(ProductRating productRating, ProductItem productItem, UserInfo userInfo) {
        return ProductRatingDto.builder()
                .user(userInfo)
                .product(productItem)
                .stars(productRating.getStars())
                .message(productRating.getMessage())
                .date(productRating.getDate())
                .build();
    }
}
