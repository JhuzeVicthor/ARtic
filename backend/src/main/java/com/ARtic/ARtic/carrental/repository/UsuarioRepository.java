package com.ARtic.ARtic.carrental.repository;

import com.ARtic.ARtic.carrental.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}