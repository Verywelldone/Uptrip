package uptrip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import uptrip.model.product.ProductRating;

import java.util.List;

@Repository
public interface ProductRatingRepository extends JpaRepository<ProductRating, Long> {

    boolean existsByUserIdAndProductId(long userId, long productId);
    List<ProductRating> getAllByProductId(Long productId);
}
