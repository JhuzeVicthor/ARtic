package com.ARtic.carrental.controller;

import com.ARtic.carrental.dto.Autorizacao.LoginRequest;
import com.ARtic.carrental.dto.Autorizacao.RegistroRequest;
import com.ARtic.carrental.dto.Autorizacao.JwtResponse;
import com.ARtic.carrental.exception.ResourceAlreadyExistsException;
import com.ARtic.carrental.model.Usuario;
import com.ARtic.carrental.services.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegistroRequest registroRequest) {
        try {
            Usuario usuarioRegistrado = authService.registrarUsuario(registroRequest);
            return new ResponseEntity<>("Usuário registrado com sucesso! ID: " + usuarioRegistrado.getId(), HttpStatus.CREATED);
        } catch (ResourceAlreadyExistsException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro interno ao registrar usuário: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            JwtResponse jwtResponse = authService.autenticarUsuario(loginRequest);
            return ResponseEntity.ok(jwtResponse);
        } catch (org.springframework.security.authentication.BadCredentialsException e) {
            return new ResponseEntity<>("Email ou senha inválidos.", HttpStatus.UNAUTHORIZED); // HTTP 401
        } catch (Exception e) {
            return new ResponseEntity<>("Erro interno ao tentar fazer login: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}