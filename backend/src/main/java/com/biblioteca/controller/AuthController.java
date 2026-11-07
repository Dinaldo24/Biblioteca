package com.biblioteca.controller;

import com.biblioteca.dto.CambiarPasswordRequest;
import com.biblioteca.dto.LoginRequest;
import com.biblioteca.dto.LoginResponse;
import com.biblioteca.model.Usuario;
import com.biblioteca.repository.UsuarioRepository;
import com.biblioteca.service.JwtSecurityService;
import com.biblioteca.service.LoginRateLimiterService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final LoginRateLimiterService rateLimiterService;
    private final JwtSecurityService jwtSecurityService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(
            UsuarioRepository usuarioRepository,
            LoginRateLimiterService rateLimiterService,
            JwtSecurityService jwtSecurityService,
            PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.rateLimiterService = rateLimiterService;
        this.jwtSecurityService = jwtSecurityService;
        this.passwordEncoder = passwordEncoder;
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

    private String extractBearerToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7).trim();
        }
        return null;
    }

    private boolean verifyPassword(Usuario usuario, String rawPassword) {
        if (usuario.getPassword() == null || rawPassword == null) {
            return false;
        }

        // 1. Verificar si ya esta hasheado con BCrypt
        if (passwordEncoder.matches(rawPassword, usuario.getPassword())) {
            return true;
        }

        // 2. Transición suave: si estaba en texto plano, migrar inmediatamente a hash BCrypt
        if (usuario.getPassword().equals(rawPassword)) {
            usuario.setPassword(passwordEncoder.encode(rawPassword));
            usuarioRepository.save(usuario);
            return true;
        }

        return false;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        String clientIp = getClientIp(request);

        // 1. Rate Limit
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

        if (usuarioOpt.isEmpty() || !verifyPassword(usuarioOpt.get(), loginRequest.getPassword())) {
            boolean justLocked = rateLimiterService.recordFailedAttempt(clientIp);
            if (justLocked) {
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                        .body(new LoginResponse(false, "Demasiados intentos fallidos. Acceso bloqueado temporalmente por "
                                + LoginRateLimiterService.LOCKOUT_MINUTES + " minutos."));
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse(false, "Credenciales incorrectas"));
        }

        rateLimiterService.resetAttempts(clientIp);
        Usuario usuario = usuarioOpt.get();

        // 2. Generar token JWT firmado
        String token = jwtSecurityService.generateToken(usuario.getUsername(), usuario.getRol());

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
    public ResponseEntity<Map<String, Object>> cambiarPassword(@RequestBody CambiarPasswordRequest request, HttpServletRequest httpRequest) {
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
        if (!verifyPassword(usuario, request.getActualPassword())) {
            resp.put("exito", false);
            resp.put("mensaje", "La contraseña actual no es correcta");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resp);
        }

        if (request.getNuevaPassword().trim().length() < 3) {
            resp.put("exito", false);
            resp.put("mensaje", "La nueva contraseña debe tener al menos 3 caracteres");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resp);
        }

        usuario.setPassword(passwordEncoder.encode(request.getNuevaPassword().trim()));
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
        if (!verifyPassword(usuario, actualPassword)) {
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
            usuario.setPassword(passwordEncoder.encode(nuevaPassword.trim()));
        }

        usuarioRepository.save(usuario);

        resp.put("exito", true);
        resp.put("mensaje", "¡Perfil actualizado exitosamente!");
        resp.put("username", usuario.getUsername());
        resp.put("nombre", usuario.getNombre());
        return ResponseEntity.ok(resp);
    }

    /**
     * Endpoint protegido: solo administradores autenticados con JWT valido pueden listar usuarios.
     * La contraseña NUNCA es visible en JSON gracias a @JsonProperty(WRITE_ONLY) en Usuario.java.
     */
    @GetMapping("/usuarios")
    public ResponseEntity<?> listarUsuarios(HttpServletRequest request) {
        String token = extractBearerToken(request);
        if (!jwtSecurityService.validateToken(token) || !"ADMIN".equalsIgnoreCase(jwtSecurityService.extractRole(token))) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Acceso denegado: se requiere autorización de Administrador");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        return ResponseEntity.ok(usuarioRepository.findAll());
    }
}
