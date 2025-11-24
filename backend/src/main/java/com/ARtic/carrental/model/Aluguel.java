package com.ARtic.carrental.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
public class Aluguel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "carro_id")
    private Carro carro;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    private LocalDate dataInicio;
    private LocalDate dataFim;
    private BigDecimal valorTotal;
    private String status;
}