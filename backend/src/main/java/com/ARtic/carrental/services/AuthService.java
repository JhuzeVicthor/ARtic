package com.ARtic.carrental.services;

import com.ARtic.carrental.dto.Autorizacao.LoginRequest;
import com.ARtic.carrental.dto.Autorizacao.RegistroRequest;
import com.ARtic.carrental.dto.Autorizacao.JwtResponse;
import com.ARtic.carrental.exception.ResourceAlreadyExistsException;
import com.ARtic.carrental.model.Usuario;
import com.ARtic.carrental.repository.UsuarioRepository;
import com.ARtic.carrental.security.jwt.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.userdetails.UsernameNotFoundException; // Novo import

import java.util.Optional;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @Transactional
    public Usuario registrarUsuario(RegistroRequest registroRequest) {
        if (usuarioRepository.existsByEmail(registroRequest.getEmail())) {
            throw new ResourceAlreadyExistsException("Email já está em uso!");
        }

        String hashedPassword = passwordEncoder.encode(registroRequest.getPassword());

        Usuario novoUsuario = new Usuario(
                registroRequest.getFullName(),
                registroRequest.getEmail(),
                hashedPassword
        );

        return usuarioRepository.save(novoUsuario);
    }

    public JwtResponse autenticarUsuario(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtils.generateJwtToken(authentication);

        String emailAutenticado = ((org.springframework.security.core.userdetails.User) authentication.getPrincipal()).getUsername();
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(emailAutenticado);

        if (usuarioOpt.isEmpty()) {
            throw new UsernameNotFoundException("Erro interno: Usuário autenticado, mas não encontrado no repositório.");
        }
        Usuario usuario = usuarioOpt.get();

        return new JwtResponse(jwt, usuario.getId(), usuario.getEmail(), usuario.getFullName());
    }
}