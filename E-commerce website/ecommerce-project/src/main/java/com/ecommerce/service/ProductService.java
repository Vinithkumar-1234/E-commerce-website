package com.ecommerce.service;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service layer - contains business logic for product operations.
 */
@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> searchProducts(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllProducts();
        }
        return productRepository.searchByName(keyword.trim());
    }

    public Product addProduct(Product product) {
        validateProduct(product);
        return productRepository.save(product);
    }

    public Optional<Product> updateProduct(Long id, Product product) {
        validateProduct(product);
        if (!productRepository.findById(id).isPresent()) {
            return Optional.empty();
        }
        product.setId(id);
        boolean updated = productRepository.update(product);
        return updated ? Optional.of(product) : Optional.empty();
    }

    public boolean deleteProduct(Long id) {
        return productRepository.deleteById(id);
    }

    private void validateProduct(Product product) {
        if (product.getName() == null || product.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Product name is required");
        }
        if (product.getPrice() == null || product.getPrice().signum() <= 0) {
            throw new IllegalArgumentException("Product price must be greater than zero");
        }
        if (product.getStockQuantity() < 0) {
            throw new IllegalArgumentException("Stock quantity cannot be negative");
        }
    }
}
