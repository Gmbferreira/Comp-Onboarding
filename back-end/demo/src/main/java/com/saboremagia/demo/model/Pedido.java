
package com.saboremagia.demo.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.CascadeType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ItemPedido> itens;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    @JsonBackReference
    private Cliente cliente;

    private String endereco;

    private float valor;

    //-----------------GETTERS E SETTERS-----------------

    public int getId(){
        return id;
    }
    public List<ItemPedido> getItens(){
        return itens;
    }
    public Cliente getCliente(){
        return cliente;
    }

    public String getEndereco(){
        return endereco;
    }

    public float getValor(){
        return valor;
    }

    public void setItens(List<ItemPedido> itens){
        this.itens = itens;  
    }

    public void setCliente(Cliente cliente){
        this.cliente = cliente;
    }

    public void setEndereco(String endereco){
        this.endereco = endereco;
    }

    public void setValor(float valor){
        this.valor = valor;
    }
}

