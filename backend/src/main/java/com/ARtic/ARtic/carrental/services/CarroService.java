package com.ARtic.ARtic.carrental.services;


import com.ARtic.ARtic.carrental.dto.CarroRequestDTO;
import com.ARtic.ARtic.carrental.dto.CarroResponseDTO;
import com.ARtic.ARtic.carrental.model.Carro;
import com.ARtic.ARtic.carrental.repository.CarroRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CarroService {
    private final CarroRepository carroRepository;

    public CarroService(CarroRepository carroRepository) {
        this.carroRepository = carroRepository;
    }

    public CarroResponseDTO createCarro(CarroRequestDTO carroRequestDTO){
        Carro carro = new Carro();
        BeanUtils.copyProperties(carroRequestDTO, carro);
        Carro savedCarro = carroRepository.save(carro);
        CarroResponseDTO carroResponseDTO = new CarroResponseDTO();
        BeanUtils.copyProperties(savedCarro, carroResponseDTO);
        return carroResponseDTO;
    }

    public List<CarroResponseDTO> createCarrosEmLote(List<CarroRequestDTO> carroRequestDTOS) {
        return carroRequestDTOS.stream()
                .map(this::createCarro)
                .collect(Collectors.toList());
    }

    public List<CarroResponseDTO> getAllCarros() {
        return carroRepository.findAll().stream()
                .map(carro -> {
                    CarroResponseDTO carroResponseDTO = new CarroResponseDTO();
                    BeanUtils.copyProperties(carro, carroResponseDTO);
                    return carroResponseDTO;
                })
                .collect(Collectors.toList());
    }

    public List<CarroResponseDTO> getCarrosDisponiveisAluguel() {
        return carroRepository.findByDisponivelParaAluguel(true).stream()
                .map(carro -> {
                    CarroResponseDTO dto = new CarroResponseDTO();
                    BeanUtils.copyProperties(carro, dto);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public List<CarroResponseDTO> getCarrosDisponiveisVendas() {
        return carroRepository.findByDisponivelParaVenda(true).stream()
                .map(carro -> {
                    CarroResponseDTO dto = new CarroResponseDTO();
                    BeanUtils.copyProperties(carro, dto);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public Optional<CarroResponseDTO> getCarroById(Long id) {
        return carroRepository.findById(id)
                .map(carro ->  {
                    CarroResponseDTO carroResponseDTO = new CarroResponseDTO();
                    BeanUtils.copyProperties(carro, carroResponseDTO);
                    return carroResponseDTO;
                });
    }

    public Optional<CarroResponseDTO> updateCarro(Long id, CarroRequestDTO carroRequestDTO) {
        return carroRepository.findById(id)
                .map(existingCarro -> {
                    BeanUtils.copyProperties(carroRequestDTO, existingCarro, "id"); // Ignora o ID ao copiar
                    Carro updatedCarro = carroRepository.save(existingCarro);
                    CarroResponseDTO carroResponseDTO = new CarroResponseDTO();
                    BeanUtils.copyProperties(updatedCarro, carroResponseDTO);
                    return carroResponseDTO;
                });
    }

    public boolean deleteCarro(Long id) {
        if (carroRepository.existsById(id)) {
            carroRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
