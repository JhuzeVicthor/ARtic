package com.ARtic.carrental.dto.Autorizacao;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String tipo = "Bearer";
    private Long id;
    private String email;
    private String fullName;

    public JwtResponse(String token, Long id, String email, String fullName) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.fullName = fullName;
    }
}
