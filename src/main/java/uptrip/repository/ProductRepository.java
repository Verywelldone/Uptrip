package uptrip.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uptrip.model.product.ProductCategory;
import uptrip.model.product.ProductItem;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductItem, Long> {
    Optional<Object> findProductItemByName(String name);

    Optional<Object> findProductItemsByProductCategory(ProductCategory productCategory);

    List<Object> findAllByStockGreaterThan(int stock);
}
