package com.saboremagia.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saboremagia.demo.model.CategoriaPrato;
import com.saboremagia.demo.model.Prato;

public interface PratoRepository extends JpaRepository<Prato, Integer> {
    List<Prato> findByPrecoBetween(float min, float max);
    List<Prato> findByCategoria(CategoriaPrato categoria);
}
