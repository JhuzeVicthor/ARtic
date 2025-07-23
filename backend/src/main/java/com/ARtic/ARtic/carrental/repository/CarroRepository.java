package com.ARtic.ARtic.carrental.repository;

import com.ARtic.ARtic.carrental.model.Carro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarroRepository  extends JpaRepository<Carro, Long> {
}