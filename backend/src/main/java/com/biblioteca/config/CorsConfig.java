package com.biblioteca.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOriginPatterns(
                                "https://biblioteca-juanpablo.vercel.app",
                                "https://biblioteca-doy3.vercel.app",
                                "https://*.vercel.app",
                                "http://localhost:5173",
                                "http://localhost:3000",
                                "http://localhost:3001"
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH")
                        .allowedHeaders("Authorization", "Content-Type", "X-Requested-With", "Accept")
                        .exposedHeaders("Authorization")
                        .allowCredentials(false);
            }
        };
    }
}
