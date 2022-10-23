package uptrip.model.order.dto;

import lombok.Getter;
import lombok.Setter;
import uptrip.model.product.ProductItem;

@Getter
@Setter
public class OrderProductDto {
    private ProductItem productItem;

    private Integer quantity;

}
