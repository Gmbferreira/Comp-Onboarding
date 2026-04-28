package com.saboremagia.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import com.saboremagia.demo.model.Cliente;
import com.saboremagia.demo.model.Pedido;
import com.saboremagia.demo.model.Prato;
import com.saboremagia.demo.repository.PedidoRepository;
import com.saboremagia.demo.repository.PratoRepository;
@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    //@Autowired
    //private ClienteRepository clienteRepository;

    @Autowired
    private PratoRepository pratoRepository;


    //alterar o método para depender do cliente.
    public Pedido criarPedido(Pedido pedido){

    List<Integer> ids = pedido.getPrato()
        .stream()
        .map(Prato::getId)
        .toList();

    List<Prato> pratos = pratoRepository.findAllById(ids);

    pedido.setPrato(pratos);

    return pedidoRepository.save(pedido);
}

    public List<Pedido> listar(){
        return pedidoRepository.findAll();
    }

    public Pedido buscarPorId(int id){
        return pedidoRepository.findById(id).orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
    }

    public void deletar(int id){
        pedidoRepository.deleteById(id);
    }

    public Pedido adicionarPrato(int pedidoId, int pratoId){
        Pedido pedido = pedidoRepository.findById(pedidoId).orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
        Prato prato = pratoRepository.findById(pratoId).orElseThrow(() -> new RuntimeException("Prato não encontrado"));
        pedido.adicionarPrato(prato);
        return pedidoRepository.save(pedido);
    }

    public Pedido removerPrato(int pedidoId, int pratoId){
        Pedido pedido = pedidoRepository.findById(pedidoId).orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
        Prato prato = pratoRepository.findById(pratoId).orElseThrow(() -> new RuntimeException("Prato não encontrado"));
        pedido.removerPrato(prato);
        return pedidoRepository.save(pedido);
    }

    public float calcularTotal(int pedidoId){
        Pedido pedido = buscarPorId(pedidoId);
        return pedido.calcularTotal();
    }
}