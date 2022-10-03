package uptrip.model.product;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProductCategory {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String description;

    @OneToMany(mappedBy = "productCategory", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private List<ProductItem> productItemList = new ArrayList<>();

    public void addProduct(ProductItem productItem) {
        productItemList.add(productItem);
        productItem.setProductCategory(this);
    }

    public void removeProduct(ProductItem productItem) {
        productItemList.remove(productItem);
        productItem.setProductCategory(null);
    }
}
