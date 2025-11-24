package com.ARtic.carrental.repository;

import com.ARtic.carrental.model.Carro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarroRepository  extends JpaRepository<Carro, Long> {

    List<Carro> findByDisponivelParaAluguelTrue();
    List<Carro> findByDisponivelParaVendaTrue();
    List<Carro> findByDisponivelParaAluguel(Boolean disponivel);
    List<Carro> findByDisponivelParaVenda(Boolean disponivel);
}