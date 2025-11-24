package com.ARtic.carrental.controller;

import com.ARtic.carrental.dto.AluguelRequestDTO;
import com.ARtic.carrental.model.Aluguel;
import com.ARtic.carrental.services.AluguelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/aluguel")
public class AluguelController {

    private AluguelService aluguelService;

    public AluguelController(AluguelService aluguelService) {
        this.aluguelService = aluguelService;
    }

    @PostMapping
    public ResponseEntity<Aluguel> realizarAluguel(@RequestBody AluguelRequestDTO aluguelRequestDTO) {
        Aluguel novoAluguel = aluguelService.realizarAluguel(aluguelRequestDTO);
        return new ResponseEntity<>(novoAluguel, HttpStatus.CREATED);
    }
}