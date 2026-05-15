package com.saboremagia.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saboremagia.demo.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
    List<Pedido> findByClienteId(int clienteId);
}