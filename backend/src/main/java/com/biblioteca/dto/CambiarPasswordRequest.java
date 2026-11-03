package com.biblioteca.dto;

public class CambiarPasswordRequest {
    private String username;
    private String actualPassword;
    private String nuevaPassword;

    public CambiarPasswordRequest() {
    }

    public CambiarPasswordRequest(String username, String actualPassword, String nuevaPassword) {
        this.username = username;
        this.actualPassword = actualPassword;
        this.nuevaPassword = nuevaPassword;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getActualPassword() {
        return actualPassword;
    }

    public void setActualPassword(String actualPassword) {
        this.actualPassword = actualPassword;
    }

    public String getNuevaPassword() {
        return nuevaPassword;
    }

    public void setNuevaPassword(String nuevaPassword) {
        this.nuevaPassword = nuevaPassword;
    }
}
