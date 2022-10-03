package uptrip.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uptrip.model.product.ProductItem;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductItem, Long> {
    Optional<Object> findProductItemByName(String name);
}
