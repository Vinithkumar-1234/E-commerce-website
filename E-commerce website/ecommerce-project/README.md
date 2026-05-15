# ShopEase - Full-Stack E-Commerce Web Application

A modern, responsive e-commerce platform built with **Spring Boot**, **Spring MVC**, **Spring JDBC**, **HTML**, **CSS**, and **JavaScript**.

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## Features

### Frontend
- **Home / Product Listing** – Product cards with image, name, price, description, View Details & Add to Cart
- **Product Search** – Real-time JavaScript search with category filters
- **Product Details** – Full product info, quantity selector, stock status
- **Shopping Cart** – Add/remove items, quantity controls, LocalStorage persistence
- **Checkout** – Form validation, simulated order placement with fake order ID
- **Responsive Design** – Mobile, tablet, and desktop layouts (Flexbox/Grid + Media Queries)

### Backend (REST API)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products?search=keyword` | Search products |
| GET | `/api/products/{id}` | Get product by ID |
| POST | `/api/products` | Add product |
| PUT | `/api/products/{id}` | Update product |
| DELETE | `/api/products/{id}` | Delete product |

### Stretch Features
- Mock authentication (Login / Signup with sessionStorage)
- Wishlist with LocalStorage
- Admin panel (Add / Edit / Delete products)
- Test-mode payment methods on checkout

## Project Structure

```
ecommerce-project/
├── src/main/java/com/ecommerce/
│   ├── EcommerceApplication.java
│   ├── config/WebConfig.java
│   ├── controller/ProductController.java
│   ├── service/ProductService.java
│   ├── repository/ProductRepository.java
│   └── model/Product.java
├── src/main/resources/
│   ├── static/          # HTML, CSS, JS
│   ├── schema.sql
│   ├── data.sql
│   └── application.properties
├── database.sql         # MySQL setup script
├── pom.xml
└── README.md
```

## Prerequisites

- **Java 17** or higher
- **Maven 3.6+**
- (Optional) **MySQL 8+** for production database

## Quick Start

### 1. Clone / Navigate to project

```bash
cd ecommerce-project
```

### 2. Run the application

```bash
mvn spring-boot:run
```

### 3. Open in browser

Visit: **http://localhost:8080**

The app uses an **embedded H2 database** by default with 12 sample products pre-loaded.

### H2 Console (optional)

- URL: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:ecommerce_db`
- Username: `sa`
- Password: *(empty)*

## Using MySQL

1. Run `database.sql` in MySQL Workbench or CLI
2. Update `application.properties` – comment H2 settings and uncomment MySQL settings
3. Set your MySQL username and password
4. Restart the application

## Screenshots

Add screenshots of your running application to a `screenshots/` folder:

| Page | Filename |
|------|----------|
| Home / Products | `home.png` |
| Product Details | `product-details.png` |
| Shopping Cart | `cart.png` |
| Checkout | `checkout.png` |
| Order Confirmation | `order-confirmation.png` |
| Login / Signup | `auth.png` |
| Wishlist | `wishlist.png` |
| Admin Panel | `admin.png` |

## API Examples

```bash
# Get all products
curl http://localhost:8080/api/products

# Get product by ID
curl http://localhost:8080/api/products/1

# Search products
curl "http://localhost:8080/api/products?search=headphones"

# Add product
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"New Product","description":"Desc","price":49.99,"category":"Electronics","imageUrl":"https://example.com/img.jpg","stockQuantity":10}'
```

## Technology Stack

| Layer | Technology |
|-------|------------|
| Backend | Spring Boot 3.2, Spring MVC, Spring JDBC |
| Database | H2 (dev) / MySQL (prod) |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Build | Maven |

## Learning Outcomes

This project demonstrates:
- DOM manipulation and event handling
- REST API integration with fetch()
- Spring MVC layered architecture (Controller → Service → Repository)
- Spring JDBC database operations
- LocalStorage for cart and wishlist persistence
- Responsive web design with CSS Grid/Flexbox
- Client-side form validation
- Modular JavaScript code organization

## License

MIT License – free to use for learning and portfolio projects.
