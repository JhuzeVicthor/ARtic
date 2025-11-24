package com.ARtic.carrental.controller;

import com.ARtic.carrental.dto.CompraRequestDTO;
import com.ARtic.carrental.model.Compra;
import com.ARtic.carrental.services.CompraService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/compra")
public class CompraController {

    private final CompraService compraService;

    public CompraController(CompraService compraService) {
        this.compraService = compraService;
    }

    @PostMapping
    public ResponseEntity<Compra> realizarCompra(@RequestBody CompraRequestDTO compraRequestDTO) {
        Compra novaCompra = compraService.realizarCompra(compraRequestDTO);
        return new ResponseEntity<>(novaCompra, HttpStatus.CREATED);
    }
}