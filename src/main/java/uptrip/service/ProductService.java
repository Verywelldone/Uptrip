package uptrip.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import uptrip.model.order.Order;
import uptrip.model.order.OrderProduct;
import uptrip.model.product.ProductCategory;
import uptrip.model.product.ProductItem;
import uptrip.repository.OrderRepository;
import uptrip.repository.ProductCategoryRepository;
import uptrip.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final OrderRepository orderRepository;


    public ResponseEntity<ProductItem> createProduct(final ProductItem productItem) {

        validateProduct(productItem);
        log.info("Creating product: {}", productItem);

        ProductCategory productCategory = productCategoryRepository.findProductCategoryByName(productItem.getProductCategory().getName()).get();
        productCategory.addProduct(productItem);

        productItem.setProductCategory(productCategory);

        productRepository.save(productItem);

        return ResponseEntity.ok(productItem);
    }


    public ResponseEntity<ProductItem> updateProduct(final ProductItem productItem) {
        log.info("Updating product {}", productItem.getId());
        Optional<ProductItem> productItemOpt = productRepository.findById(productItem.getId());
        if (productItemOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        validateProduct(productItem);

        productItem.setProductCategory(productItemOpt.get().getProductCategory());
        productRepository.save(productItem);
        return ResponseEntity.ok(productItem);
    }

    public ResponseEntity<String> deleteProduct(final long productId) {
        log.info("Deleting product");
        Optional<ProductItem> productItemOpt = productRepository.findById(productId);
        if (productItemOpt.isEmpty()) {
            log.info("Product {} not found, cannot delete", productId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
        List<Order> orders = orderRepository.findAll();
        for (Order order : orders) {
            for (OrderProduct orderProduct : order.getOrderProducts()) {
                if (orderProduct.getProduct().getId() == productId) {
                    log.info("Product {} is in order {}, cannot delete", productId, order.getId());
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Product is in order, cannot delete");
                }
            }
        }

        ProductCategory productCategory = productCategoryRepository.findById(productItemOpt.get().getProductCategory().getId()).get();
        productCategory.removeProduct(productItemOpt.get());

        productCategoryRepository.save(productCategory);

        log.info("Product {} deleted", productId);
        return ResponseEntity.status(HttpStatus.OK).body("Product deleted");

    }

    public ResponseEntity<List<ProductItem>> getAllProducts() {
        log.info("Getting all products");
        return new ResponseEntity<>(productRepository.findAll(), HttpStatus.OK);
    }

    public ResponseEntity<ProductItem> getOneProduct(final long id) {
        log.info("Getting product with id: {}", id);
        return productRepository.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }

    private void validateProduct(ProductItem productItem) {
        log.info("Validating product: {}", productItem);
        if (isProductAlreadySaved(productItem)) {
            log.info("Product {} already exists", productItem);
            ResponseEntity.status(HttpStatus.CONFLICT).body("Product already exists");
        }
        if (isCategoryAvailable(productItem)) {
            log.info("Product category {} not found", productItem.getProductCategory().getId());
            ResponseEntity.status(HttpStatus.CONFLICT).body("Category not available");
        }

    }

    private boolean isCategoryAvailable(ProductItem productItem) {
        return productCategoryRepository.findProductCategoryByName(productItem.getProductCategory().getName()).isPresent();
    }

    private boolean isProductAlreadySaved(ProductItem productItem) {
        return productRepository.findProductItemByName(productItem.getName()).isPresent();
    }

}
