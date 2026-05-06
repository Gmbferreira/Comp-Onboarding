package com.saboremagia.demo.dto;

public class ItemPedidoDTO {
    private int pratoId;
    private int quantidade;

    public int getPratoId(){ 
        return pratoId; 
    }

    public int getQuantidade(){ 
        return quantidade; 
    }
       
    public void setPratoId(int pratoId){ 
        this.pratoId = pratoId; 
    }

    public void setQuantidade(int quantidade){ 
        this.quantidade = quantidade; 
    }
}
