package com.ARtic.ARtic.carrental.repository;

import com.ARtic.ARtic.carrental.model.Carro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarroRepository  extends JpaRepository<Carro, Long> {

    List<Carro> findByDisponivelParaAluguel(Boolean disponivel);
    List<Carro> findByDisponivelParaVenda(Boolean disponivel);
    List<Carro> findByDisponivelParaAluguelOrDisponivelParaVenda(boolean aluguel, boolean venda);
}