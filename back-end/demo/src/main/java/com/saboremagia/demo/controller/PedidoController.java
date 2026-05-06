package com.saboremagia.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saboremagia.demo.dto.PedidoDTO;
import com.saboremagia.demo.model.Pedido;
import com.saboremagia.demo.service.PedidoService;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping
    public Pedido criar(@RequestBody PedidoDTO dtoPedido){
        return pedidoService.criarPedido(dtoPedido);
    }

    @GetMapping
    public List<Pedido> listar(){
        return pedidoService.listar();
    }
    
    /* 
    @GetMapping("/{id}")
    public Pedido buscarPorId(@PathVariable int id){
        return pedidoService.buscarPorId(id);
    }
    
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable int id){
        pedidoService.deletar(id);
    }
    
    @PatchMapping("/{pedidoId}/pratos/{pratoId}")
    public Pedido adicionarPrato(
        @PathVariable int pedidoId,
        @PathVariable int pratoId
    ){
        return pedidoService.adicionarPrato(pedidoId, pratoId);
    }
    
    @DeleteMapping("/{pedidoId}/pratos/{pratoId}")
    public Pedido removerPrato(
        @PathVariable int pedidoId,
        @PathVariable int pratoId
    ){
        return pedidoService.removerPrato(pedidoId, pratoId);
    }

    @GetMapping("/{pedidoId}/total")
    public float calcularTotal(@PathVariable int pedidoId){
        return pedidoService.calcularTotal(pedidoId);
    }
    */
}