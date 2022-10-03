package uptrip.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import uptrip.model.order.OrderProduct;
import uptrip.repository.OrderProductRepository;

@Service
@AllArgsConstructor
public class OrderProductService {

    private final OrderProductRepository orderProductRepository;

    public OrderProduct create(OrderProduct orderProduct) {
        return orderProductRepository.save(orderProduct);
    }

}
