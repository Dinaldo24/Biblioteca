package com.biblioteca.controller;

import com.biblioteca.model.Libro;
import com.biblioteca.service.JwtSecurityService;
import com.biblioteca.service.LibroService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/libros")
public class LibroController {

    private final LibroService libroService;
    private final JwtSecurityService jwtSecurityService;

    @Autowired
    public LibroController(LibroService libroService, JwtSecurityService jwtSecurityService) {
        this.libroService = libroService;
        this.jwtSecurityService = jwtSecurityService;
    }

    private boolean isAuthorizedAdmin(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return false;
        }
        String token = authHeader.substring(7).trim();
        return jwtSecurityService.validateToken(token) && "ADMIN".equalsIgnoreCase(jwtSecurityService.extractRole(token));
    }

    // Obtener todos los libros (Acceso publico)
    @GetMapping
    public ResponseEntity<List<Libro>> listarLibros(
            @RequestParam(required = false) String titulo,
            @RequestParam(required = false) String genero) {

        if (titulo != null && !titulo.isBlank()) {
            return ResponseEntity.ok(libroService.buscarPorTitulo(titulo));
        }

        if (genero != null && !genero.isBlank()) {
            return ResponseEntity.ok(libroService.buscarPorGenero(genero));
        }

        return ResponseEntity.ok(libroService.obtenerTodos());
    }

    // Obtener un libro por ID (Acceso publico)
    @GetMapping("/{id}")
    public ResponseEntity<Libro> obtenerLibroPorId(@PathVariable Long id) {
        return libroService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear un nuevo libro (Solo Administradores autenticados)
    @PostMapping
    public ResponseEntity<?> crearLibro(@RequestBody Libro libro, HttpServletRequest request) {
        if (!isAuthorizedAdmin(request)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Acceso denegado: se requiere autorización de administrador para registrar libros.");
        }

        if (libro.getTitulo() == null || libro.getTitulo().isBlank()
                || libro.getAutor() == null || libro.getAutor().isBlank()
                || libro.getGenero() == null || libro.getGenero().isBlank()) {
            return ResponseEntity.badRequest().body("Título, autor y género son campos requeridos.");
        }

        Libro nuevoLibro = libroService.guardar(libro);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoLibro);
    }

    // Actualizar un libro existente (Solo Administradores autenticados)
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarLibro(@PathVariable Long id, @RequestBody Libro libro, HttpServletRequest request) {
        if (!isAuthorizedAdmin(request)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Acceso denegado: se requiere autorización de administrador para modificar libros.");
        }

        return libroService.actualizar(id, libro)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Eliminar un libro (Solo Administradores autenticados)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarLibro(@PathVariable Long id, HttpServletRequest request) {
        if (!isAuthorizedAdmin(request)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Acceso denegado: se requiere autorización de administrador para eliminar libros.");
        }

        boolean eliminado = libroService.eliminar(id);
        if (eliminado) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
