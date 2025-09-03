package com.ARtic.ARtic.carrental.controller;

import com.ARtic.ARtic.carrental.dto.CarroRequestDTO;
import com.ARtic.ARtic.carrental.dto.CarroResponseDTO;
import com.ARtic.ARtic.carrental.services.CarroService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/carros")
public class CarroController {

    private final CarroService carroService;

    public CarroController(CarroService carroService) {
        this.carroService = carroService;
    }

    @PostMapping
    public ResponseEntity<CarroResponseDTO> createCarro(@Valid @RequestBody CarroRequestDTO carroRequestDTO) {
        CarroResponseDTO newCarro = carroService.createCarro(carroRequestDTO);
        return new ResponseEntity<>(newCarro, HttpStatus.CREATED);
    }


    @PostMapping("/em-lote")
    public ResponseEntity<List<CarroResponseDTO>> createCarrosEmLote(@Valid @RequestBody List<CarroRequestDTO> carroRequestDTO) {
        List<CarroResponseDTO> novosCarros = carroService.createCarrosEmLote(carroRequestDTO);
        return new ResponseEntity<>(novosCarros, HttpStatus.CREATED);
    }


    @GetMapping
    public ResponseEntity<List<CarroResponseDTO>> getAllCarros(
            @RequestParam(required = false) Boolean disponivelParaAluguel,
            @RequestParam(required = false) Boolean disponivelParaVenda) {
        List<CarroResponseDTO> carros = carroService.getAllCarros(disponivelParaAluguel, disponivelParaVenda);
        return ResponseEntity.ok(carros);
    }


    @GetMapping("/{id}")
    public ResponseEntity<CarroResponseDTO> getCarroById(@PathVariable Long id) {
        return carroService.getCarroById(id)
                .map(carro -> new ResponseEntity<>(carro, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @PutMapping("/{id}")
    public ResponseEntity<CarroResponseDTO> updateCarro(@PathVariable Long id, @Valid @RequestBody CarroRequestDTO carroRequestDTO) {
        return carroService.updateCarro(id, carroRequestDTO)
                .map(updatedCarro -> new ResponseEntity<>(updatedCarro, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCarro(@PathVariable Long id) {
        if (carroService.deleteCarro(id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}