package com.biblioteca.service;

import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Servicio de control de tasa de intentos (Rate Limiting) para el login.
 * Protege el endpoint contra ataques de fuerza bruta por IP.
 */
@Service
public class LoginRateLimiterService {

    public static final int MAX_FAILED_ATTEMPTS = 5;
    public static final long LOCKOUT_MINUTES = 5;

    private static class ClientAttempt {
        int failedAttempts = 0;
        Instant lastAttempt = Instant.now();
        Instant lockedUntil = null;
    }

    private final Map<String, ClientAttempt> attempts = new ConcurrentHashMap<>();

    /**
     * Retorna los segundos restantes si la IP está bloqueada, o 0 si no lo está.
     */
    public synchronized long getLockoutRemainingSeconds(String clientIp) {
        cleanExpiredEntries();
        ClientAttempt ca = attempts.get(clientIp);
        if (ca == null || ca.lockedUntil == null) {
            return 0;
        }

        Instant now = Instant.now();
        if (now.isBefore(ca.lockedUntil)) {
            return Duration.between(now, ca.lockedUntil).getSeconds() + 1;
        } else {
            // El bloqueo expiró, eliminamos el registro para permitir nuevos intentos
            attempts.remove(clientIp);
            return 0;
        }
    }

    /**
     * Registra un intento fallido y activa el bloqueo si se alcanza el límite.
     * Retorna true si este intento activó el bloqueo.
     */
    public synchronized boolean recordFailedAttempt(String clientIp) {
        Instant now = Instant.now();
        ClientAttempt ca = attempts.computeIfAbsent(clientIp, k -> new ClientAttempt());
        ca.failedAttempts++;
        ca.lastAttempt = now;

        if (ca.failedAttempts >= MAX_FAILED_ATTEMPTS) {
            ca.lockedUntil = now.plus(Duration.ofMinutes(LOCKOUT_MINUTES));
            return true;
        }
        return false;
    }

    /**
     * Limpia los intentos fallidos de la IP tras un inicio de sesión exitoso.
     */
    public synchronized void resetAttempts(String clientIp) {
        attempts.remove(clientIp);
    }

    /**
     * Retorna cuántos intentos fallidos lleva acumulados la IP.
     */
    public synchronized int getFailedAttempts(String clientIp) {
        ClientAttempt ca = attempts.get(clientIp);
        return ca != null ? ca.failedAttempts : 0;
    }

    private void cleanExpiredEntries() {
        Instant cutoff = Instant.now().minus(Duration.ofMinutes(30));
        attempts.entrySet().removeIf(entry -> {
            ClientAttempt ca = entry.getValue();
            boolean notLocked = ca.lockedUntil == null || Instant.now().isAfter(ca.lockedUntil);
            return notLocked && ca.lastAttempt.isBefore(cutoff);
        });
    }
}
