package com.ecommerce.repository;

import com.ecommerce.model.Product;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

/**
 * Repository layer - handles all database operations for products using Spring JDBC.
 */
@Repository
public class ProductRepository {

    private final JdbcTemplate jdbcTemplate;

    private static final RowMapper<Product> PRODUCT_ROW_MAPPER = (rs, rowNum) -> {
        Product product = new Product();
        product.setId(rs.getLong("id"));
        product.setName(rs.getString("name"));
        product.setDescription(rs.getString("description"));
        product.setPrice(rs.getBigDecimal("price"));
        product.setCategory(rs.getString("category"));
        product.setImageUrl(rs.getString("image_url"));
        product.setStockQuantity(rs.getInt("stock_quantity"));
        return product;
    };

    public ProductRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Product> findAll() {
        String sql = "SELECT * FROM products ORDER BY id";
        return jdbcTemplate.query(sql, PRODUCT_ROW_MAPPER);
    }

    public Optional<Product> findById(Long id) {
        String sql = "SELECT * FROM products WHERE id = ?";
        List<Product> products = jdbcTemplate.query(sql, PRODUCT_ROW_MAPPER, id);
        return products.isEmpty() ? Optional.empty() : Optional.of(products.get(0));
    }

    public List<Product> searchByName(String keyword) {
        String sql = "SELECT * FROM products WHERE LOWER(name) LIKE LOWER(?) OR LOWER(category) LIKE LOWER(?) ORDER BY id";
        String pattern = "%" + keyword + "%";
        return jdbcTemplate.query(sql, PRODUCT_ROW_MAPPER, pattern, pattern);
    }

    public Product save(Product product) {
        String sql = "INSERT INTO products (name, description, price, category, image_url, stock_quantity) VALUES (?, ?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, product.getName());
            ps.setString(2, product.getDescription());
            ps.setBigDecimal(3, product.getPrice());
            ps.setString(4, product.getCategory());
            ps.setString(5, product.getImageUrl());
            ps.setInt(6, product.getStockQuantity());
            return ps;
        }, keyHolder);

        Number key = keyHolder.getKey();
        if (key != null) {
            product.setId(key.longValue());
        }
        return product;
    }

    public boolean update(Product product) {
        String sql = "UPDATE products SET name = ?, description = ?, price = ?, category = ?, image_url = ?, stock_quantity = ? WHERE id = ?";
        int rows = jdbcTemplate.update(sql,
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getCategory(),
                product.getImageUrl(),
                product.getStockQuantity(),
                product.getId());
        return rows > 0;
    }

    public boolean deleteById(Long id) {
        String sql = "DELETE FROM products WHERE id = ?";
        int rows = jdbcTemplate.update(sql, id);
        return rows > 0;
    }
}
