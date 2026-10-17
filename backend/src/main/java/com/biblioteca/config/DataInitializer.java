package com.biblioteca.config;

import com.biblioteca.model.Usuario;
import com.biblioteca.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(UsuarioRepository usuarioRepository) {
        return args -> {
            if (usuarioRepository.count() == 0) {
                Usuario admin = new Usuario();
                admin.setUsername("admin");
                admin.setPassword("123");
                admin.setRol("ADMIN");
                admin.setNombre("Administrador General");
                usuarioRepository.save(admin);
                System.out.println(">>> Usuario administrador inicial creado con éxito (admin / 123) <<<");
            }
        };
    }
}
