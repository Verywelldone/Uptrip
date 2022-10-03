package uptrip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uptrip.model.order.EOrderStatus;
import uptrip.model.order.Order;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Order findOrderById(long id);

    List<Order> findAllByUserId(long userId);

    List<Order> findAllByUserIdAndOrderStatus(Long id, EOrderStatus valueOf);
}
