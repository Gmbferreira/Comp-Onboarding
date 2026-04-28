package com.saboremagia.demo.model;

import java.util.ArrayList;
import java.util.List;

public class Cardapio {
    
    private List<Prato> pratos;

    public Cardapio(){
        this.pratos = new ArrayList<>();
    }

    //Recebe um prato como parâmetro e adiciona a lista de pratos do Cardápio. Retorna um int para controle se o método está funcionando.
    public int adicionarPrato(Prato pratos){
        this.pratos.add(pratos);
        return this.pratos.size();
    }

    //Recebe uma categoria de prato como parâmetro e retorna uma lista de pratos, baseada no cardápio, que pertencem a essa categoria.
    public List<Prato> listarCategoria(CategoriaPrato categoria){
        List<Prato> pratosCategoria = new ArrayList<>();

        for(Prato prato : pratos){
            if(prato.getCategoria() == categoria){
                pratosCategoria.add(prato);
            }
        }
        return pratosCategoria;
    }
    
    //Recebe dois parâmetros de preço, e retornam uma lista de pratos, baseada no cardápio, que estão dentro dessa faixa de preço.
    public List<Prato> pratosPorPreco(float precoMin, float precoMax){
        List<Prato> pratosFaixaPreco = new ArrayList<>();
        for(Prato prato : pratos){
            if(prato.getPreco() >= precoMin && prato.getPreco() <= precoMax){
                pratosFaixaPreco.add(prato);
            }
        }
        return pratosFaixaPreco;
    }

    ///-----------------GETTERS E SETTERS-----------------
    public List<Prato> getPrato(){
        return pratos;
    }

    public void setPrato(List<Prato> pratos){
        this.pratos = pratos;
    }
}
