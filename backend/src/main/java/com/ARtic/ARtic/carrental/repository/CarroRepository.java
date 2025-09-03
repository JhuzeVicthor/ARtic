package com.ARtic.ARtic.carrental.repository;

import com.ARtic.ARtic.carrental.model.Carro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarroRepository  extends JpaRepository<Carro, Long> {

    List<Carro> findByDisponivelParaAluguelTrue();
    List<Carro> findByDisponivelParaVendaTrue();
    List<Carro> findByDisponivelParaAluguel(Boolean disponivel);
    List<Carro> findByDisponivelParaVenda(Boolean disponivel);
}