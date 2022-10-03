package uptrip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uptrip.model.order.OrderProduct;

public interface OrderProductRepository extends JpaRepository<OrderProduct, Long> {
}

