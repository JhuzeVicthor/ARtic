package com.ARtic.carrental.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AluguelRequestDTO {
    private Long carroId;
    private Long UsuarioId;
    private LocalDate dataInicio;
    private LocalDate dataFim;
}