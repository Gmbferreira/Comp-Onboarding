package com.saboremagia.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.saboremagia.demo.model.ItemPedido;

public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Integer> {
}