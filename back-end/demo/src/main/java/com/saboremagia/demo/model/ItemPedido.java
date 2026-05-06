package com.saboremagia.demo.model;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
public class ItemPedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    @JsonBackReference
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "prato_id")
    private Prato prato;

    private int quantidade;

    public int getId(){ 
        return id; 
    }

    public Pedido getPedido(){ 
        return pedido; 
    }

    public Prato getPrato(){ 
        return prato; 
    }

    public int getQuantidade(){ 
        return quantidade; 
    }

    public void setPedido(Pedido pedido){ 
        this.pedido = pedido; 
    }
    
    public void setPrato(Prato prato){ 
        this.prato = prato;
    }
    
    public void setQuantidade(int quantidade){ 
        this.quantidade = quantidade; 
    }
    
}
