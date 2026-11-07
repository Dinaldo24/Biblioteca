package com.biblioteca.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;

/**
 * Servicio de emision y validacion de tokens criptograficos JWT (HMAC-SHA256).
 * Valida la autenticidad, expiracion y rol de las solicitudes administrativas.
 */
@Service
public class JwtSecurityService {

    private final byte[] secretKeyBytes;
    private static final long EXPIRATION_MILLIS = 24L * 60 * 60 * 1000; // 24 horas

    public JwtSecurityService(@Value("${JWT_SECRET:biblioteca-secreta-juan-pablo-vizcardo-y-guzman-2026-segura}") String secret) {
        try {
            // Asegurar al menos 256 bits de entropia usando SHA-256 sobre la clave configurada
            MessageDigest sha256 = MessageDigest.getInstance("SHA-256");
            this.secretKeyBytes = sha256.digest(secret.getBytes(StandardCharsets.UTF_8));
        } catch (Exception e) {
            throw new RuntimeException("Error inicializando firma criptografica JWT", e);
        }
    }

    /**
     * Genera un token JWT firmado.
     */
    public String generateToken(String username, String role) {
        long now = System.currentTimeMillis();
        long exp = now + EXPIRATION_MILLIS;

        String headerJson = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}";
        String payloadJson = String.format("{\"sub\":\"%s\",\"role\":\"%s\",\"iat\":%d,\"exp\":%d}",
                escapeJson(username), escapeJson(role), now / 1000, exp / 1000);

        String headerBase64 = base64UrlEncode(headerJson.getBytes(StandardCharsets.UTF_8));
        String payloadBase64 = base64UrlEncode(payloadJson.getBytes(StandardCharsets.UTF_8));
        String dataToSign = headerBase64 + "." + payloadBase64;

        String signatureBase64 = base64UrlEncode(signHmacSha256(dataToSign));
        return dataToSign + "." + signatureBase64;
    }

    /**
     * Valida la firma criptografica y expiracion del token.
     */
    public boolean validateToken(String token) {
        if (token == null || token.isBlank()) {
            return false;
        }

        String[] parts = token.trim().split("\\.");
        if (parts.length != 3) {
            return false;
        }

        String dataToSign = parts[0] + "." + parts[1];
        String expectedSignature = base64UrlEncode(signHmacSha256(dataToSign));

        if (!MessageDigest.isEqual(expectedSignature.getBytes(StandardCharsets.UTF_8), parts[2].getBytes(StandardCharsets.UTF_8))) {
            return false;
        }

        try {
            String payloadJson = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
            long expSeconds = extractLongFromJson(payloadJson, "exp");
            if (expSeconds > 0 && (System.currentTimeMillis() / 1000) > expSeconds) {
                return false; // Token expirado
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Extrae el rol del payload del token.
     */
    public String extractRole(String token) {
        try {
            String[] parts = token.trim().split("\\.");
            if (parts.length >= 2) {
                String payloadJson = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
                return extractStringFromJson(payloadJson, "role");
            }
        } catch (Exception ignored) {
        }
        return null;
    }

    /**
     * Extrae el username del payload del token.
     */
    public String extractUsername(String token) {
        try {
            String[] parts = token.trim().split("\\.");
            if (parts.length >= 2) {
                String payloadJson = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
                return extractStringFromJson(payloadJson, "sub");
            }
        } catch (Exception ignored) {
        }
        return null;
    }

    private byte[] signHmacSha256(String data) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec keySpec = new SecretKeySpec(this.secretKeyBytes, "HmacSHA256");
            mac.init(keySpec);
            return mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        } catch (Exception e) {
            throw new RuntimeException("Error firmando payload con HMAC-SHA256", e);
        }
    }

    private String base64UrlEncode(byte[] bytes) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"");
    }

    private long extractLongFromJson(String json, String key) {
        String pattern = "\"" + key + "\":";
        int idx = json.indexOf(pattern);
        if (idx == -1) return 0;
        int start = idx + pattern.length();
        int end = start;
        while (end < json.length() && (Character.isDigit(json.charAt(end)) || json.charAt(end) == '-')) {
            end++;
        }
        if (start == end) return 0;
        try {
            return Long.parseLong(json.substring(start, end).trim());
        } catch (Exception e) {
            return 0;
        }
    }

    private String extractStringFromJson(String json, String key) {
        String pattern = "\"" + key + "\":\"";
        int idx = json.indexOf(pattern);
        if (idx == -1) return null;
        int start = idx + pattern.length();
        int end = json.indexOf("\"", start);
        if (end == -1) return null;
        return json.substring(start, end);
    }
}
