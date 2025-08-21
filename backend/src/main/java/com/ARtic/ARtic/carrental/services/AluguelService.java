package com.ARtic.ARtic.carrental.services;

import com.ARtic.ARtic.carrental.dto.AluguelRequestDTO;
import com.ARtic.ARtic.carrental.model.Aluguel;
import com.ARtic.ARtic.carrental.model.Carro;
import com.ARtic.ARtic.carrental.model.Usuario;
import com.ARtic.ARtic.carrental.repository.AluguelRepository;
import com.ARtic.ARtic.carrental.repository.CarroRepository;
import com.ARtic.ARtic.carrental.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;

@Service
public class AluguelService {

    private final AluguelRepository aluguelRepository;
    private final CarroRepository carroRepository;
    private final UsuarioRepository usuarioRepository;

    public AluguelService(AluguelRepository aluguelRepository, CarroRepository carroRepository, UsuarioRepository usuarioRepository) {
        this.aluguelRepository = aluguelRepository;
        this.carroRepository = carroRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public Aluguel realizarAluguel(AluguelRequestDTO aluguelRequestDTO) {
        Carro carro = carroRepository.findById(aluguelRequestDTO.getCarroId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Carro não encontrado"));
        Usuario usuario = usuarioRepository.findById(aluguelRequestDTO.getUsuarioId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));

        if (!carro.getDisponivelParaAluguel()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Carro não está disponivel para Aluguel");
        }
        long dias = ChronoUnit.DAYS.between(aluguelRequestDTO.getDataInicio(), aluguelRequestDTO.getDataFim());
        if (dias <= 0){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A data de fim deve ser postarior à data de inicio");
        }

        BigDecimal valorTotal = carro.getPrecoAluguelPorDia().multiply(BigDecimal.valueOf(dias));

        Aluguel novoAluguel = new Aluguel();
        novoAluguel.setCarro(carro);
        novoAluguel.setUsuario(usuario);
        novoAluguel.setDataInicio(aluguelRequestDTO.getDataInicio());
        novoAluguel.setDataFim(aluguelRequestDTO.getDataFim());
        novoAluguel.setValorTotal(valorTotal);
        novoAluguel.setStatus("PENDENTE");

        carro.setDisponivelParaAluguel(false);
        carroRepository.save(carro);

        return aluguelRepository.save(novoAluguel);
    }
}
