package com.saboremagia.demo.dto;
import java.util.List;

public class PedidoDTO {
    private int clienteId;
    private List<ItemPedidoDTO> itens;
    private String endereco;

    public int getClienteId(){ 
        return clienteId; 
    }

    public List<ItemPedidoDTO> getItens(){ 
        return itens; 
    }

    public String getEndereco(){ 
        return endereco; 
    }

    public void setClienteId(int clienteId){ 
        this.clienteId = clienteId; 
    }

    public void setItens(List<ItemPedidoDTO> itens){ 
        this.itens = itens; 
    }

    public void setEndereco(String endereco){ 
        this.endereco = endereco; 
    }
}