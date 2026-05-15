package com.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web MVC configuration for routing static pages.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
        registry.addViewController("/product-details").setViewName("forward:/product-details.html");
        registry.addViewController("/cart").setViewName("forward:/cart.html");
        registry.addViewController("/checkout").setViewName("forward:/checkout.html");
        registry.addViewController("/login").setViewName("forward:/login.html");
        registry.addViewController("/signup").setViewName("forward:/signup.html");
        registry.addViewController("/wishlist").setViewName("forward:/wishlist.html");
        registry.addViewController("/admin").setViewName("forward:/admin.html");
    }
}
