
package com.saboremagia.demo.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
@DiscriminatorValue("Cliente")
public class Cliente extends Usuario {
    private String endereco;
    
    @OneToMany(mappedBy = "cliente")
    @JsonManagedReference
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
