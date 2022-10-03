package uptrip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uptrip.model.product.ProductCategory;

import java.util.Optional;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    Optional<ProductCategory> findProductCategoryByName(String name);
}
