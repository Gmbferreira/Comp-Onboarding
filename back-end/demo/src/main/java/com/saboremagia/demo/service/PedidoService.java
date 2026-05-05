package com.saboremagia.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.saboremagia.demo.model.Cliente;
import com.saboremagia.demo.model.Pedido;
import com.saboremagia.demo.model.Prato;
import com.saboremagia.demo.repository.PedidoRepository;
import com.saboremagia.demo.repository.PratoRepository;
import com.saboremagia.demo.repository.ClienteRepository;


@Service
public class PedidoService {
    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PratoRepository pratoRepository;

    public Pedido criarPedido(Pedido pedido){

        Cliente cliente = clienteRepository.findById(pedido.getCliente().getId()).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        if(cliente == null){
            throw new RuntimeException("É necessário estar cadastrado para fazer um pedido.");
        }
        pedido.setCliente(cliente);

        List<Prato> pratosValidados = new ArrayList<>();
        for (Prato p : pedido.getPratos()) {
            Prato pratoBanco = pratoRepository.findById(p.getId()).orElseThrow(() -> new RuntimeException("Prato não encontrado"));
            pratosValidados.add(pratoBanco);
        }

        if(pedido.getPratos() == null){
            throw new RuntimeException("Pedido Vazio!");
        }
        pedido.setPratos(pratosValidados);

        return pedidoRepository.save(pedido);
    }

    
    public List<Pedido> listar(){
        return pedidoRepository.findAll();
    }
    /*

    public Pedido buscarPorId(int id){
        return pedidoRepository.findById(id).orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
    }

    public void deletar(int id){
        pedidoRepository.deleteById(id);
    }

    public Pedido adicionarPrato(int pedidoId, int pratoId){
        Pedido pedido = new Pedido();
        return pedidoRepository.save(pedido);
    }

    public Pedido removerPrato(int pedidoId, int pratoId){
        Pedido pedido = new Pedido();
        return pedidoRepository.save(pedido);
    }
    */
    public float calcularTotal(Pedido pedido){
        float total = 0;
        for (Prato p : pedido.getPratos()) {
            total += p.getPreco();
        }
        return (total + 10);
    }    
}