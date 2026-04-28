package com.saboremagia.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.saboremagia.demo.model.Pedido;
import com.saboremagia.demo.service.PedidoService;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    // 🔥 Criar pedido
    @PostMapping
    public Pedido criar(@RequestBody Pedido pedido){
        return pedidoService.criarPedido(pedido);
    }

    // 📄 Listar todos
    @GetMapping
    public List<Pedido> listar(){
        return pedidoService.listar();
    }

    // 🔍 Buscar por id
    @GetMapping("/{id}")
    public Pedido buscarPorId(@PathVariable int id){
        return pedidoService.buscarPorId(id);
    }

    // ❌ Deletar
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable int id){
        pedidoService.deletar(id);
    }

    // ➕ Adicionar prato ao pedido
    @PatchMapping("/{pedidoId}/pratos/{pratoId}")
    public Pedido adicionarPrato(
        @PathVariable int pedidoId,
        @PathVariable int pratoId
    ){
        return pedidoService.adicionarPrato(pedidoId, pratoId);
    }

    // ➖ Remover prato do pedido
    @DeleteMapping("/{pedidoId}/pratos/{pratoId}")
    public Pedido removerPrato(
        @PathVariable int pedidoId,
        @PathVariable int pratoId
    ){
        return pedidoService.removerPrato(pedidoId, pratoId);
    }

    // 💰 Calcular total
    @GetMapping("/{pedidoId}/total")
    public float calcularTotal(@PathVariable int pedidoId){
        return pedidoService.calcularTotal(pedidoId);
    }
}