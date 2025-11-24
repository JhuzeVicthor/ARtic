package com.ARtic.carrental.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@Table(name = "usuarios")
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;


    private String telefone;
    private String cpf;

    public Usuario(String fullName, String email, String password) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
    }
}