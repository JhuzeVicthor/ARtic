package com.ARtic.ARtic.carrental.repository;

import com.ARtic.ARtic.carrental.model.Aluguel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AluguelRepository  extends JpaRepository<Aluguel,Long> {
}