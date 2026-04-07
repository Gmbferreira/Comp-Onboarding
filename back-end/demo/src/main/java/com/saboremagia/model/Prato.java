package com.saboremagia.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Prato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nome;
    private String descricao;
    private float nota;
    private float preco;
    private String imagem;
    private CategoriaPrato categoria;
    private boolean ativo;


    //-----------------GETTERS E SETTERS-----------------
    public int getId(){
        return id;
    }
    public String getNome(){
        return nome;
    }
    public String getDescricao(){
        return descricao;
    }
    public float getNota(){
        return nota;
    }
    public float getPreco(){
        return preco;
    }
    public String getImagem(){
        return imagem;
    }
    public CategoriaPrato getCategoria(){
        return categoria;
    }
    public boolean getAtivo(){
        return ativo;
    }

    public void setNome(String nome){
        this.nome = nome;
    }
    public void setDescricao(String descricao){
        this.descricao = descricao;
    }
    public void setPreco(float preco){
        this.preco = preco;
    }
    public void setImagem(String imagem){
        this.imagem = imagem;
    }
    public void setCategoria(CategoriaPrato categoria){
        this.categoria = categoria;
    }
    public void setAtivo(boolean ativo){
        this.ativo = ativo;
    }
}
