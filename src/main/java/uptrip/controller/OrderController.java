package uptrip.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uptrip.model.order.Order;
import uptrip.model.order.dto.OrderForm;
import uptrip.service.OrderService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/orders")
@AllArgsConstructor
@PreAuthorize("hasRole('USER')")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody OrderForm form) {
        return orderService.createOrder(form);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderService.getOneOrder(id);
    }

    @GetMapping("/get-by-uuid/{uuid}")
    public ResponseEntity<Order> getOrderByUUID(@PathVariable String uuid) {
        return orderService.getOrderByUUID(uuid);
    }

    @GetMapping("/get")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getAll() {
        return orderService.getAllOrders();
    }

    @GetMapping("/get/user/{id}")
    public ResponseEntity<List<Order>> getAllByCustomer(@PathVariable Long id) {
        return orderService.getAllOrdersByCustomer(id);
    }

    @GetMapping("/get/user/{id}/status/{status}")
    public ResponseEntity<List<Order>> getAllByCustomerAndStatus(@PathVariable Long id, @PathVariable String status) {
        return orderService.getAllOrdersByCustomerAndStatus(id, status);
    }

    /* @PutMapping("/update")
     public ResponseEntity<Order> update(@RequestBody Order form) {
         return orderService.update(form);
     }
 */
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Order order) {
        return orderService.updateOrder(id, order);
    }


    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        return orderService.deleteOrder(id);
    }

}
