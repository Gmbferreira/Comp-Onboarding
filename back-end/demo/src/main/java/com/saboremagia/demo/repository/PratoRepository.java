package com.saboremagia.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saboremagia.demo.model.Prato;

public interface PratoRepository extends JpaRepository<Prato, Integer> {
}
