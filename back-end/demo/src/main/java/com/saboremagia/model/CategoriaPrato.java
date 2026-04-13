package com.saboremagia.model;

public enum CategoriaPrato {

    REFEICAO(1), 
    SOBREMESA(2), 
    ACOMPANHAMENTO(3), 
    BEBIDA(4);
    
    private int id;
    
    CategoriaPrato(int id){
        this.id = id;
    }

    public int getId(){
        return id;
    }
}
