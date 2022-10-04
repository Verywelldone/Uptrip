package uptrip.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uptrip.model.product.ProductItem;
import uptrip.model.product.dto.ProductItemDto;
import uptrip.service.ProductService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/products")
@AllArgsConstructor
@PreAuthorize("hasRole('USER')")
public class ProductController {

    private final ProductService productService;

    @GetMapping("/{id}")
    public ResponseEntity<ProductItem> getOne(@PathVariable long id) {
        return productService.getOneProduct(id);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/getByProductCategory/{id}")
    public ResponseEntity<?> getAllProductsByCategory(@PathVariable Long id) {
        return productService.getAllProductsByCategory(id);
    }

    @PostMapping(value = "/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addProduct(@RequestBody ProductItemDto dto) {
        return productService.createProduct(dto);
    }

    @PutMapping(value = "/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateProduct(@RequestBody ProductItemDto dto, @PathVariable Long id) {
        return productService.updateProduct(dto, id);
    }

    @DeleteMapping(value = "/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProduct(@PathVariable long id) {
        return productService.deleteProduct(id);
    }
}
