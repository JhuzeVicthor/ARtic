package com.ARtic.ARtic.carrental.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.apache.logging.log4j.message.Message;

import java.math.BigDecimal;

@Data
public class CarroDTO {

    @NotBlank(message = "Marca é obrigatória")
    private String marca;

    @NotBlank(message = "Ano é obrigatório")
    private Integer ano;

    @NotNull(message = "Ano é obrigatório")
    @Min(value = 1900, message = "Ano inválido")
    private String cor;

    @NotBlank(message = "Placa é obrigatória")
    private String placa;

    @NotBlank(message = "Tipo de combustivel é obrigatório")
    private String tipoCombustivel;

    @NotNull(message = "Número de portas é obrigatório")
    @Min(value = 2, message = "Um carro deve ter pelo menos 2 portas")
    private Integer portas;

    @NotNull(message = "Preço de aluguel por dia é obrigatório")
    @Min(value = 0, message = "Preço de aluguel não pode ser negativo")
    private BigDecimal preçoAluguelPorDia;

    @NotNull(message = "Preço de venda é obrigatório")
    @Min(value = 0, message = "Preço de venda não pode ser negativo")
    private BigDecimal preçoVenda;

    private String urlImagem;

    @NotNull(message = "Disponibilidade para aluguel é obrigatória")
    private Boolean disponivelParaAluguel;

    @NotNull(message = "Disponibilidade para venda é obrigatória")
    private Boolean disponivelParaVenda;
}