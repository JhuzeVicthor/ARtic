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

    public List<CarroResponseDTO> getAllCarros(Boolean disponivelParaAluguel, Boolean disponivelParaVenda) {
        List<Carro> carros;
        if (disponivelParaAluguel != null && disponivelParaVenda != null) {
            carros = carroRepository.findAll().stream()
                    .filter(carro -> carro.getDisponivelParaAluguel() == disponivelParaAluguel &&
                            carro.getDisponivelParaVenda() == disponivelParaVenda)
                    .collect(Collectors.toList());
        } else if (disponivelParaAluguel != null) {
            carros = carroRepository.findByDisponivelParaAluguel(disponivelParaAluguel);
        } else if (disponivelParaVenda != null) {
            carros = carroRepository.findByDisponivelParaVenda(disponivelParaVenda);
        } else {
            carros = carroRepository.findAll();
        }
        return carros.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<CarroResponseDTO> getCarrosDisponiveisAluguel() {
        return carroRepository.findByDisponivelParaAluguelTrue().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<CarroResponseDTO> getCarrosDisponiveisVendas() {
        return carroRepository.findByDisponivelParaVendaTrue().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<CarroResponseDTO> getCarroById(Long id) {
        return carroRepository.findById(id)
                .map(this::convertToDto);
    }

    public Optional<CarroResponseDTO> updateCarro(Long id, CarroRequestDTO carroRequestDTO) {
        return carroRepository.findById(id).map(existingCarro -> {
            BeanUtils.copyProperties(carroRequestDTO, existingCarro);
            existingCarro.setId(id);
            return convertToDto(carroRepository.save(existingCarro));
        });
    }

    public boolean deleteCarro(Long id) {
        if (carroRepository.existsById(id)) {
            carroRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private CarroResponseDTO convertToDto(Carro carro) {
        CarroResponseDTO dto = new CarroResponseDTO();
        BeanUtils.copyProperties(carro, dto);
        return dto;
    }
}
