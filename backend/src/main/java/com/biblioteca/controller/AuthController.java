package com.biblioteca.controller;

import com.biblioteca.dto.CambiarPasswordRequest;
import com.biblioteca.dto.LoginRequest;
import com.biblioteca.dto.LoginResponse;
import com.biblioteca.model.Usuario;
import com.biblioteca.repository.UsuarioRepository;
import com.biblioteca.service.LoginRateLimiterService;
import jakarta.servlet.http.HttpServletRequest;
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
    private final LoginRateLimiterService rateLimiterService;

    @Autowired
    public AuthController(UsuarioRepository usuarioRepository, LoginRateLimiterService rateLimiterService) {
        this.usuarioRepository = usuarioRepository;
        this.rateLimiterService = rateLimiterService;
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isBlank()) {
            return xForwardedFor.split(",")[0].trim();
        }
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isBlank()) {
            return xRealIp.trim();
        }
        return request.getRemoteAddr();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        String clientIp = getClientIp(request);

        // 1. Verificar si la IP está bloqueada por exceso de intentos fallidos (Rate Limit)
        long remainingLockoutSeconds = rateLimiterService.getLockoutRemainingSeconds(clientIp);
        if (remainingLockoutSeconds > 0) {
            long minutes = (remainingLockoutSeconds + 59) / 60;
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(new LoginResponse(false, "Demasiados intentos fallidos. Inténtalo de nuevo en " + minutes + " minuto(s)."));
        }

        if (loginRequest.getUsername() == null || loginRequest.getPassword() == null) {
            return ResponseEntity.badRequest().body(new LoginResponse(false, "Usuario y contraseña requeridos"));
        }

        Optional<Usuario> usuarioOpt = usuarioRepository.findByUsername(loginRequest.getUsername().trim());

        // 2. Si el usuario no existe o la contraseña no coincide: mensaje unificado "Credenciales incorrectas"
        if (usuarioOpt.isEmpty() || !usuarioOpt.get().getPassword().equals(loginRequest.getPassword())) {
            boolean justLocked = rateLimiterService.recordFailedAttempt(clientIp);
            if (justLocked) {
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                        .body(new LoginResponse(false, "Demasiados intentos fallidos. Acceso bloqueado temporalmente por " 
                                + LoginRateLimiterService.LOCKOUT_MINUTES + " minutos."));
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse(false, "Credenciales incorrectas"));
        }

        // 3. Inicio exitoso: reiniciar contador de fallos para esta IP
        rateLimiterService.resetAttempts(clientIp);

        Usuario usuario = usuarioOpt.get();
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

    @PostMapping("/editar-perfil")
    public ResponseEntity<Map<String, Object>> editarPerfil(@RequestBody Map<String, String> payload) {
        Map<String, Object> resp = new HashMap<>();
        String currentUsername = payload.get("currentUsername");
        String newUsername = payload.get("newUsername");
        String newNombre = payload.get("newNombre");
        String actualPassword = payload.get("actualPassword");
        String nuevaPassword = payload.get("nuevaPassword");

        if (currentUsername == null || actualPassword == null) {
            resp.put("exito", false);
            resp.put("mensaje", "Usuario y contraseña actual requeridos");
            return ResponseEntity.badRequest().body(resp);
        }

        Optional<Usuario> usuarioOpt = usuarioRepository.findByUsername(currentUsername);
        if (usuarioOpt.isEmpty()) {
            resp.put("exito", false);
            resp.put("mensaje", "Usuario no encontrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resp);
        }

        Usuario usuario = usuarioOpt.get();
        if (!usuario.getPassword().equals(actualPassword)) {
            resp.put("exito", false);
            resp.put("mensaje", "La contraseña actual no es correcta");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resp);
        }

        if (newUsername != null && !newUsername.isBlank() && !newUsername.equals(currentUsername)) {
            if (usuarioRepository.existsByUsername(newUsername.trim())) {
                resp.put("exito", false);
                resp.put("mensaje", "El nuevo nombre de usuario ya está ocupado");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resp);
            }
            usuario.setUsername(newUsername.trim());
        }

        if (newNombre != null && !newNombre.isBlank()) {
            usuario.setNombre(newNombre.trim());
        }

        if (nuevaPassword != null && !nuevaPassword.isBlank()) {
            if (nuevaPassword.trim().length() < 3) {
                resp.put("exito", false);
                resp.put("mensaje", "La nueva contraseña debe tener al menos 3 caracteres");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resp);
            }
            usuario.setPassword(nuevaPassword.trim());
        }

        usuarioRepository.save(usuario);

        resp.put("exito", true);
        resp.put("mensaje", "¡Perfil actualizado exitosamente!");
        resp.put("username", usuario.getUsername());
        resp.put("nombre", usuario.getNombre());
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        return ResponseEntity.ok(usuarioRepository.findAll());
    }
}
