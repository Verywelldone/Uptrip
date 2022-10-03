package uptrip.model.order;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import uptrip.model.product.ProductItem;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderProduct {

    @EmbeddedId
    @JsonIgnore
    private OrderProductPK pk;

    @Column
    private Integer quantity;

    public OrderProduct(Order order, ProductItem one, Integer quantity) {
        pk = new OrderProductPK();
        pk.setOrder(order);
        pk.setProductItem(one);
        this.quantity = quantity;
    }

    public ProductItem getProduct() {
        return this.pk.getProductItem();
    }

}
