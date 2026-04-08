package com.saboremagia.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saboremagia.model.Prato;

public interface PratoRepository extends JpaRepository<Prato, Integer> {
}
