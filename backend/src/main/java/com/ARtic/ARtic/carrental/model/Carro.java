package com.ARtic.ARtic.carrental.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Data
public class Carro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String marca;
    private String modelo;
    private Integer ano;
    private String cor;
    private String placa;
    private String tipoCombustivel;
    private Integer portas;
    private BigDecimal preçoAluguelPorDia;
    private BigDecimal preçoVenda;
    private String urlImagem;
    private Boolean disponivelParaAluguel;
    private Boolean disponivelParaVenda;
}