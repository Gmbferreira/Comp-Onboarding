
package com.saboremagia.demo.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @ManyToMany
    @JoinTable(
        name = "pedido_prato",
        joinColumns = @JoinColumn(name = "pedido_id"),
        inverseJoinColumns = @JoinColumn(name = "prato_id")
    )
    private List<Prato> prato;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    @JsonBackReference
    private Cliente cliente;

    private String endereco;

    //-----------------GETTERS E SETTERS-----------------

    public int getId(){
        return id;
    }
    public List<Prato> getPratos(){
        return prato;
    }
    public Cliente getCliente(){
        return cliente;
    }

    public String getEndereco(){
        return endereco;
    }

    public void setPratos(List<Prato> prato){
        this.prato = prato;  
    }

    public void setCliente(Cliente cliente){
        this.cliente = cliente;
    }

    public void setEndereco(String endereco){
        this.endereco = endereco;
    }
}

