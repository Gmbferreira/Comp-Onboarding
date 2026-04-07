package com.saboremagia.model;

import jakarta.persistence.Entity;
import java.util.List;

@Entity
public class Cliente extends Usuario {
    private String endereco;

    private List<Pedido> pedidos;

    //-----------------GETTERS E SETTERS-----------------
    public void setEndereco(String endereco){
        this.endereco = endereco;
    }
    public void setPedidos(List<Pedido> pedidos){
        this.pedidos = pedidos;
    }

    public String getEndereco(){
        return endereco;
    }
    public List<Pedido> getPedidos(){
        return pedidos;
    }
}
