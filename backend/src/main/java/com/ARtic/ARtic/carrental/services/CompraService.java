package com.ARtic.ARtic.carrental.services;

import com.ARtic.ARtic.carrental.dto.CompraRequestDTO;
import com.ARtic.ARtic.carrental.model.Carro;
import com.ARtic.ARtic.carrental.model.Compra;
import com.ARtic.ARtic.carrental.model.Usuario;
import com.ARtic.ARtic.carrental.repository.CarroRepository;
import com.ARtic.ARtic.carrental.repository.CompraRepository;
import com.ARtic.ARtic.carrental.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

@Service
public class CompraService {

    private final CompraRepository compraRepository;
    private final CarroRepository carroRepository;
    private final UsuarioRepository usuarioRepository;

    public CompraService(CompraRepository compraRepository, CarroRepository carroRepository, UsuarioRepository usuarioRepository) {
        this.compraRepository = compraRepository;
        this.carroRepository = carroRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public Compra realizarCompra(CompraRequestDTO compraRequestDTO) {
        Carro carro = carroRepository.findById(compraRequestDTO.getCarroId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Carro não encontrado"));
        Usuario usuario = usuarioRepository.findById(compraRequestDTO.getUsuarioId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));

        if (!carro.getDisponivelParaVenda()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Carro não está disponivel para venda");
        }

        Compra novaCompra = new Compra();
        novaCompra.setCarro(carro);
        novaCompra.setComprador(usuario);
        novaCompra.setValorPago(carro.getPrecoVenda());
        novaCompra.setStatus("PENDENTE");
        novaCompra.setDataCompra(LocalDate.now());

        carro.setDisponivelParaVenda(false);
        carroRepository.save(carro);

        return compraRepository.save(novaCompra);
    }
}
