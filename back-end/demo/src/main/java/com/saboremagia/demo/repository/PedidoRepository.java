package com.saboremagia.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.saboremagia.demo.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {

}