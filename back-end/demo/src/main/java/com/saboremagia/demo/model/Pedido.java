
package com.saboremagia.demo.model;

import java.util.ArrayList;
import java.util.List;

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
    private List<Prato> pratos = new ArrayList<>(); //deve criar uma entidade da relacao N:N entre pedido e prato

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    private String endereco;

    public float valorItens(){
        float valor = 0;
        for(Prato p : pratos){
            if(p.getAtivo()){
                valor += p.getPreco();
            }
        }
        return valor;
    }

    //Regra aleatória
    public float calcularFrete (){
        return 10;
    }

    public float calcularTotal(){
        return valorItens() + calcularFrete();
    }

    public int adicionarPrato(Prato prato){
        if(prato.getAtivo()){
            pratos.add(prato);
        }
        return pratos.size();
    }

    public int removerPrato(Prato prato){
        for(Prato p : pratos){
            if(p.getId() == prato.getId()){
                pratos.remove(prato);
            }
        }
        return pratos.size();
    }


    //-----------------GETTERS E SETTERS-----------------

    public int getId(){
        return id;
    }
    
    public List<Prato> getPratos(){
        return pratos;
    }
    public Cliente getCliente(){
        return cliente;
    }

    public void setPratos(List<Prato> prato){
        this.pratos = prato;  
    }

    public void setCliente(Cliente cliente){
        this.cliente = cliente;
    }

    public String getEndereco(){
        return endereco;
    }

    public void setEndereco(String endereco){
        this.endereco = endereco;
    }
}

