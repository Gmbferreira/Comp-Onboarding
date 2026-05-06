package com.saboremagia.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.saboremagia.demo.dto.PedidoDTO;
import com.saboremagia.demo.dto.ItemPedidoDTO;
import com.saboremagia.demo.model.Cliente;
import com.saboremagia.demo.model.Pedido;
import com.saboremagia.demo.model.ItemPedido;
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

    public Pedido criarPedido(PedidoDTO dtoPedido){

        Cliente cliente = clienteRepository.findById(dtoPedido.getClienteId()).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        if(dtoPedido.getItens() == null){
            throw new RuntimeException("Pedido Vazio!");
        }

        if (dtoPedido.getEndereco() == null || dtoPedido.getEndereco().trim().isEmpty()) {
            throw new RuntimeException("Endereço obrigatório!");
        }

        Pedido pedido = new Pedido();
        pedido.setCliente(cliente);
        pedido.setEndereco(dtoPedido.getEndereco());

        List<ItemPedido> itens = new ArrayList<>();
        for (ItemPedidoDTO itemDTO : dtoPedido.getItens()) {
            Prato prato = pratoRepository.findById(itemDTO.getPratoId()).orElseThrow(() -> new RuntimeException("Prato não encontrado"));
            ItemPedido item = new ItemPedido();
            item.setPedido(pedido);
            item.setPrato(prato);
            item.setQuantidade(itemDTO.getQuantidade());
            itens.add(item);
        }

        pedido.setItens(itens);
        pedido.setValor(calcularTotal(pedido));
        return pedidoRepository.save(pedido);
    }

    
    public List<Pedido> listar(){
        return pedidoRepository.findAll();
    }

    public float calcularTotal(Pedido pedido){
        float total = 0;
        for (ItemPedido item : pedido.getItens()) {
            total += item.getPrato().getPreco() * item.getQuantidade();
        }
        return (total + 10);
    }    
}