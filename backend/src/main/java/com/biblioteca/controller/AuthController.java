package com.biblioteca.controller;

import com.biblioteca.dto.CambiarPasswordRequest;
import com.biblioteca.dto.LoginRequest;
import com.biblioteca.dto.LoginResponse;
import com.biblioteca.model.Usuario;
import com.biblioteca.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public AuthController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        if (loginRequest.getUsername() == null || loginRequest.getPassword() == null) {
            return ResponseEntity.badRequest().body(new LoginResponse(false, "Usuario y contraseña requeridos"));
        }

        Optional<Usuario> usuarioOpt = usuarioRepository.findByUsername(loginRequest.getUsername());

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse(false, "Usuario no encontrado"));
        }

        Usuario usuario = usuarioOpt.get();

        if (!usuario.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse(false, "Contraseña incorrecta"));
        }

        // Generar un token de sesión sencillo
        String token = "admin-token-" + UUID.randomUUID().toString();

        LoginResponse response = new LoginResponse(
                true,
                "Inicio de sesión exitoso",
                usuario.getId(),
                usuario.getUsername(),
                usuario.getNombre(),
                usuario.getRol(),
                token
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/cambiar-password")
    public ResponseEntity<Map<String, Object>> cambiarPassword(@RequestBody CambiarPasswordRequest request) {
        Map<String, Object> resp = new HashMap<>();

        if (request.getUsername() == null || request.getActualPassword() == null || request.getNuevaPassword() == null) {
            resp.put("exito", false);
            resp.put("mensaje", "Todos los campos son obligatorios");
            return ResponseEntity.badRequest().body(resp);
        }

        Optional<Usuario> usuarioOpt = usuarioRepository.findByUsername(request.getUsername());
        if (usuarioOpt.isEmpty()) {
            resp.put("exito", false);
            resp.put("mensaje", "Usuario no encontrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resp);
        }

        Usuario usuario = usuarioOpt.get();
        if (!usuario.getPassword().equals(request.getActualPassword())) {
            resp.put("exito", false);
            resp.put("mensaje", "La contraseña actual no es correcta");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resp);
        }

        if (request.getNuevaPassword().trim().length() < 3) {
            resp.put("exito", false);
            resp.put("mensaje", "La nueva contraseña debe tener al menos 3 caracteres");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resp);
        }

        usuario.setPassword(request.getNuevaPassword().trim());
        usuarioRepository.save(usuario);

        resp.put("exito", true);
        resp.put("mensaje", "¡Contraseña actualizada exitosamente!");
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        return ResponseEntity.ok(usuarioRepository.findAll());
    }
}
