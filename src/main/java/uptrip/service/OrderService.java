package uptrip.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import uptrip.model.order.EOrderStatus;
import uptrip.model.order.Order;
import uptrip.model.order.OrderProduct;
import uptrip.model.order.dto.OrderForm;
import uptrip.model.order.dto.OrderProductDto;
import uptrip.model.product.ProductItem;
import uptrip.model.product.dto.ProductItemDto;
import uptrip.model.user.Address;
import uptrip.model.user.User;
import uptrip.repository.AddressRepository;
import uptrip.repository.OrderRepository;
import uptrip.repository.UserRepository;

import java.text.SimpleDateFormat;
import java.util.*;

import static uptrip.exception.OrderCreationException.PRODUCT_STOCK_NOT_AVAILABLE_MESSAGE;

@Service
@AllArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductService productService;
    private final OrderProductService orderProductService;

    private final AddressRepository addressRepository;

    @NotNull
    private static String getFormattedCurrentDate() {
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy hh:mm");
        return format.format(new Date());
    }

    public ResponseEntity<?> createOrder(final OrderForm orderForm) {
        if (!isProductsAvailable(orderForm.getOrderProducts()))
            return new ResponseEntity<>(PRODUCT_STOCK_NOT_AVAILABLE_MESSAGE, HttpStatus.BAD_REQUEST);

        if (isUpdateStockWithErrors(orderForm.getOrderProducts()))
            return new ResponseEntity<>(PRODUCT_STOCK_NOT_AVAILABLE_MESSAGE, HttpStatus.BAD_REQUEST);

        if (getOptionalUser().isEmpty())
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        User user = getOptionalUser().get();

        createUserAddress(orderForm, user);
        Order order = createOrderAndAddProductList(orderForm);
        setOrderUserInfo(user, order);

        userRepository.save(user);
        updateOrder(order.getId(), order);

        log.info("Order created successfully");

        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    public ResponseEntity<Order> getOneOrder(final long orderId) {
        log.info("Getting order with id: " + orderId);
        return orderRepository.findById(orderId).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }

    public ResponseEntity<Order> getOrderByUUID(String uuid) {
        return orderRepository.findByUuid(uuid).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }

    public ResponseEntity<List<Order>> getAllOrders() {
        orderRepository.findAll().forEach(order -> log.info("Order: {}", order));
        log.info("Getting all orders");
        return ResponseEntity.status(HttpStatus.OK).body(orderRepository.findAll());
    }

    public ResponseEntity<List<Order>> getAllOrdersByCustomer(final long userId) {
        orderRepository.findAll().forEach(order -> log.info("Order: {}", order.getUuid()));
        log.info("Getting all orders by customer with id: " + userId);
        return ResponseEntity.status(HttpStatus.OK).body(orderRepository.findAllByUserIdOrderByDateCreatedDesc(userId));
    }

    public ResponseEntity<String> deleteOrder(final long orderId) {
        if (orderRepository.findById(orderId).isPresent()) {
            log.info("Deleting order with id: " + orderId);
            orderRepository.deleteById(orderId);
            return ResponseEntity.status(HttpStatus.OK).body("Order has been deleted");
        }
        log.info("Order with id: " + orderId + " not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
    }

    public Order createOrder(Order order) {
        order.setDateCreated(getFormattedCurrentDate());
        order.setOrderStatus(EOrderStatus.PENDING);
        order.setLastStatusUpdate(getFormattedCurrentDate());

        log.info("Creating order");
        return orderRepository.save(order);
    }

    public ResponseEntity<List<Order>> getAllOrdersByCustomerAndStatus(Long id, String status) {
        return new ResponseEntity<>(orderRepository.findAllByUserIdAndOrderStatus(id, EOrderStatus.valueOf(status)), HttpStatus.OK);
    }

    public ResponseEntity<?> updateOrder(Long id, Order order) {
        log.info("Updating order with id: " + id);
        Optional<Order> orderOptional = orderRepository.findById(id);
        if (orderOptional.isPresent()) {
            order.setUser(orderOptional.get().getUser());
            orderRepository.save(order);
            return new ResponseEntity<>(order, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    private void createUserAddress(OrderForm orderForm, User user) {
        Address userOrderAddress = new Address();

        userOrderAddress.setUser(user);
        userOrderAddress.setEmail(orderForm.getEmail());
        userOrderAddress.setFirstName(orderForm.getFirstName());
        userOrderAddress.setLastName(orderForm.getLastName());
        userOrderAddress.setFirstAddress(orderForm.getAddress());
        userOrderAddress.setSecondAddress(orderForm.getAddress2());
        userOrderAddress.setPhoneNo(orderForm.getPhoneNo());
        userOrderAddress.setCity(orderForm.getCity());
        userOrderAddress.setPostalCode(orderForm.getPostalCode());
        userOrderAddress.setSecondAddress(orderForm.getAddress2());

        addressRepository.save(userOrderAddress);
    }

    private void setOrderUserInfo(User user, Order order) {
        order.setUser(user);
        user.getOrderList().add(order);
        user.getCartProducts().clear();
    }

    @NotNull
    private Order createOrderAndAddProductList(OrderForm orderForm) {
        Order order = new Order();
        order.setTotalPrice(orderForm.getTotalPrice());
        order = createOrder(order);
        List<OrderProduct> orderProductList = new ArrayList<>();
        for (OrderProductDto dto : orderForm.getOrderProducts())
            orderProductList.add(orderProductService.create(new OrderProduct(order, dto.getProductItem(), dto.getQuantity())));
        order.setOrderProducts(orderProductList);
        return order;
    }

    private boolean isUpdateStockWithErrors(List<OrderProductDto> orderProductList) {
        for (OrderProductDto orderProduct : orderProductList) {
            int orderQuantity = orderProduct.getQuantity();
            ProductItem productItem = productService.getOneProduct(orderProduct.getProductItem().getId()).getBody();
            assert productItem != null;
            log.info("Updating product stock");
            if (orderQuantity > productItem.getQuantity())
                return true;

            int updatedStock = productItem.getQuantity() - orderQuantity;
            productItem.setStock(updatedStock);
            productService.updateProduct(ProductItemDto.of(productItem), productItem.getId());
        }
        return false;
    }


    private boolean isProductsAvailable(List<OrderProductDto> formOrderProducts) {
        List<OrderProductDto> list = formOrderProducts
                .stream()
                .filter(orderProductDto -> Objects.isNull(productService.getOneProduct(orderProductDto.getProductItem().getId())))
                .toList();
        return CollectionUtils.isEmpty(list);
    }

    private Optional<User> getOptionalUser() {
        String username;

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }
        return userRepository.findByUsername(username);
    }

}
