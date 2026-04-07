package com.saboremagia.model;

import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @ManyToOne
    @JoinColumn(name = "prato_id")
    private List<Prato> prato; //deve criar uma entidade da relacao N:N entre pedido e prato

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    //-----------------GETTERS E SETTERS-----------------

    public int getId(){
        return id;
    }
    public List<Prato> getPrato(){
        return prato;
    }
    public Cliente getCliente(){
        return cliente;
    }

    public void setPrato(List<Prato> prato){
        this.prato = prato;  
    }

    public void setCliente(Cliente cliente){
        this.cliente = cliente;
    }
}
