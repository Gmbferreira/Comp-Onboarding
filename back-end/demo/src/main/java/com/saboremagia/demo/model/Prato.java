package com.saboremagia.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column; 
import jakarta.persistence.Lob;    

@Entity
public class Prato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private String nome;
    private String descricao;
    private float nota;
    private float preco;

    @Lob 
    @Column(columnDefinition = "TEXT") 
    private String imagem;

    @Enumerated(EnumType.STRING)
    private CategoriaPrato categoria;
    
    private boolean ativo;

    //-----------------GETTERS E SETTERS-----------------
    // (Mantenha todos os seus getters e setters como já estão)
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
    public void setNota(float nota){
        this.nota = nota;
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
    
    public void ativarPrato(){
        this.ativo = true;
    }
    public void desativarPrato(){
        this.ativo = false;
    }
}