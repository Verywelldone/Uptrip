package uptrip.model.product.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class ProductRatingDto implements Serializable {

    private String firstName;
    private String lastName;
    private int stars;
    private String title;
    private String message;
    private String date;

    public static ProductRatingDto of(String firstName, String lastName, int stars, String title, String message, String date) {
        return ProductRatingDto.builder()
                .firstName(firstName)
                .lastName(lastName)
                .stars(stars)
                .title(title)
                .message(message)
                .date(date)
                .build();
    }


}
