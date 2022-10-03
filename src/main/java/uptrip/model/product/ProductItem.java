package uptrip.model.product;


import lombok.*;

import javax.persistence.*;

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
}
