package com.ARtic.ARtic.carrental.controller;

import com.ARtic.ARtic.carrental.dto.CarroRequestDTO;
import com.ARtic.ARtic.carrental.dto.CarroResponseDTO;
import com.ARtic.ARtic.carrental.services.CarroService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/carros")
public class CarroController {

    private final CarroService carroService;

    @Autowired
    public CarroController(CarroService carroService) {
        this.carroService = carroService;
    }

    @PostMapping("/comprar")
    public ResponseEntity<CarroResponseDTO> createCarroVenda(@Valid @RequestBody CarroRequestDTO carroRequestDTO) {
        carroRequestDTO.setDisponivelParaAluguel(false);
        carroRequestDTO.setDisponivelParaVenda(true);
        CarroResponseDTO newCarro = carroService.createCarro(carroRequestDTO);
        return new ResponseEntity<>(newCarro, HttpStatus.CREATED);
    }

    @PostMapping("/aluguel")
    public ResponseEntity<CarroResponseDTO> createCarroAluguel(@Valid @RequestBody CarroRequestDTO carroRequestDTO) {
        System.out.println("DEBUG: Criando carro para ALUGUEL");
        System.out.println("DEBUG: Criando carro para COMPRA" + carroRequestDTO.getDisponivelParaAluguel() +
                ", Compra" + carroRequestDTO.getDisponivelParaAluguel());

        carroRequestDTO.setDisponivelParaAluguel(true);
        carroRequestDTO.setDisponivelParaVenda(false);
        System.out.println("DEBUG: Depois - Aluguel: " + carroRequestDTO.getDisponivelParaAluguel() +
        ", Compra: " + carroRequestDTO.getDisponivelParaVenda());

        CarroResponseDTO newCarro = carroService.createCarro(carroRequestDTO);
        return new ResponseEntity<>(newCarro, HttpStatus.CREATED);
    }

    @PostMapping("/comprar/em-lote")
    public ResponseEntity<List<CarroResponseDTO>> createCarrosCompraEmLote(@Valid @RequestBody List<CarroRequestDTO> carroRequestDTOs) {
        carroRequestDTOs.forEach(dto -> {
            dto.setDisponivelParaAluguel(false);
            dto.setDisponivelParaVenda(true);
        });
        List<CarroResponseDTO> novosCarros = carroService.createCarrosEmLote(carroRequestDTOs);
        return new ResponseEntity<>(novosCarros, HttpStatus.OK);
    }

    @PostMapping("aluguel/em-lote")
    public ResponseEntity<List<CarroResponseDTO>> createCarrosAluguelEmLote(@Valid @RequestBody List<CarroRequestDTO> carroRequestDTOs) {
        carroRequestDTOs.forEach(dto -> {
            dto.setDisponivelParaAluguel(true);
            dto.setDisponivelParaVenda(false);
        });
        List<CarroResponseDTO> novosCarros = carroService.createCarrosEmLote(carroRequestDTOs);
        return new ResponseEntity<>(novosCarros, HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity<List<CarroResponseDTO>> getAllCarros(
            @RequestParam(required = false) Boolean disponivelParaAluguel,
            @RequestParam(required = false) Boolean disponivelParaVenda) {
        System.out.println("DEBUG GET: Aluguel=" + disponivelParaAluguel + ", Compra=" + disponivelParaVenda);
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