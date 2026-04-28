package com.saboremagia.demo.service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import com.saboremagia.demo.model.CategoriaPrato;
import com.saboremagia.demo.model.Prato;
import com.saboremagia.demo.repository.PratoRepository;

@Service
public class PratoService {
    @Autowired
    private PratoRepository pratoRepository;

    public List<Prato> listarPratos() {
        return pratoRepository.findAll();
    }

    public List<Prato> pratosPorPreco(float precoMin, float precoMax){
        return pratoRepository.findByPrecoBetween(precoMin, precoMax);
    }

    public List<Prato> buscarPorCategoriaNome(String categoria){
        CategoriaPrato cat = CategoriaPrato.valueOf(categoria.toUpperCase());
        return pratoRepository.findByCategoria(cat);
    }

    public Prato criarPrato(Prato prato){
        return pratoRepository.save(prato);
    }

    public Prato ativarPrato(int id){
        Prato prato = pratoRepository.findById(id).orElseThrow();
        prato.ativarPrato();
        return pratoRepository.save(prato);
    }

    public Prato desativarPrato(int id){
        Prato prato = pratoRepository.findById(id).orElseThrow();
        prato.desativarPrato();
        return pratoRepository.save(prato);
    }

    public ResponseEntity<Prato> atualizarPrato(int id, Map<String, Object> campos) {
        return pratoRepository.findById(id).map(pratoExistente -> {
            
            campos.forEach((nomeCampo, valorCampo) -> {
                Field field = ReflectionUtils.findField(Prato.class, nomeCampo);
                if (field != null) {
                    field.setAccessible(true);
                    
                    Object valorFinal = valorCampo;
                    if (field.getType() == float.class && valorCampo instanceof Double) {
                        valorFinal = ((Double) valorCampo).floatValue();
                    }
                    
                    ReflectionUtils.setField(field, pratoExistente, valorFinal);
                }
            });

            Prato atualizado = pratoRepository.save(pratoExistente);
            return ResponseEntity.ok(atualizado);
            
        }).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<Void> apagarPrato(int id) {

        if (!pratoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        pratoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
