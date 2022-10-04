package uptrip.model.product.dto;

import lombok.*;
import uptrip.model.product.ProductItem;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductItemDto {

    private String name;
    private Double price;
    private String description;
    private int stock;
    private String image;
    private Long productCategoryId;

    public static ProductItem of(ProductItemDto createProductDto) {

        return ProductItem.builder()
                .name(createProductDto.getName())
                .price(createProductDto.getPrice())
                .description(createProductDto.getDescription())
                .stock(createProductDto.getStock())
                .image(createProductDto.getImage())
                .build();
    }

    public static ProductItemDto of(ProductItem productItem) {

        return ProductItemDto.builder()
                .name(productItem.getName())
                .price(productItem.getPrice())
                .description(productItem.getDescription())
                .stock(productItem.getStock())
                .image(productItem.getImage())
                .build();
    }

}
