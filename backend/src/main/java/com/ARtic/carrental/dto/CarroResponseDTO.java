package com.ARtic.carrental.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CarroResponseDTO {
    private Long id;
    private String marca;
    private String modelo;
    private Integer ano;
    private String cor;
    private String placa;
    private String tipoCombustivel;
    private Integer portas;
    private BigDecimal precoAluguelPorDia;
    private BigDecimal precoVenda;
    private String urlImagem;
    private Boolean disponivelParaAluguel;
    private Boolean disponivelParaVenda;
}