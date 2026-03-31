package com.saboremagia.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class ItemPedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @ManyToOne
    @JoinColumn(name = "prato_id")
    private Prato prato;
    private String nomePrato;
    private float precoPrato;

    private int quantidade;
    //-----------------GETTERS E SETTERS-----------------

    public String getNomePrato(){
        return nomePrato;
    }
    public float getPrecoPrato(){
        return precoPrato;
    }
    public int getQuantidade(){
        return quantidade;
    }

    public void setPrato(Prato prato){
        this.prato = prato;
        this.nomePrato = prato.getNome();
        this.precoPrato = prato.getPreco();    
    }

    public void setQuantidade(int quantidade){
        this.quantidade = quantidade;
    }
}
