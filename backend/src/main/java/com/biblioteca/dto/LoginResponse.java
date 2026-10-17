package com.biblioteca.dto;

public class LoginResponse {
    private boolean exito;
    private String mensaje;
    private Long id;
    private String username;
    private String nombre;
    private String rol;
    private String token;

    public LoginResponse() {
    }

    public LoginResponse(boolean exito, String mensaje) {
        this.exito = exito;
        this.mensaje = mensaje;
    }

    public LoginResponse(boolean exito, String mensaje, Long id, String username, String nombre, String rol, String token) {
        this.exito = exito;
        this.mensaje = mensaje;
        this.id = id;
        this.username = username;
        this.nombre = nombre;
        this.rol = rol;
        this.token = token;
    }

    public boolean isExito() {
        return exito;
    }

    public void setExito(boolean exito) {
        this.exito = exito;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
