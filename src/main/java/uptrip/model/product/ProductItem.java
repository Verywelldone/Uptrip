package uptrip.model.product;


import lombok.*;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "product_item", uniqueConstraints = {
        @UniqueConstraint(columnNames = "name")
})
public class ProductItem {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private Double price;

    @Column
    private String description;

    @Column
    private int stock;

    @Column
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    private ProductCategory productCategory;

    public int getQuantity() {
        return stock;
    }

    @Override
    public String
    toString() {
        return "ProductItem{" +
                "name='" + name + '\'' +
                ", price=" + price +
                ", description='" + description + '\'' +
                ", stock=" + stock +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProductItem that)) return false;
        return getId().equals(that.getId()) && Objects.equals(getName(), that.getName()) && Objects.equals(getProductCategory(), that.getProductCategory());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getProductCategory());
    }
}
