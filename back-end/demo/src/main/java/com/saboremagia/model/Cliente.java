package com.saboremagia.model;

import jakarta.persistence.Entity;

@Entity
public class Cliente extends Usuario {
    private String endereco;

    //-----------------GETTERS E SETTERS-----------------
    public void setEndereco(String endereco){
        this.endereco = endereco;
    }
    public String getEndereco(){
        return endereco;
    }
}
