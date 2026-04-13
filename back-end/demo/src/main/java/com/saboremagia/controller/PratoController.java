package com.saboremagia.controller;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saboremagia.model.Prato;
import com.saboremagia.repository.PratoRepository;



@RestController
@RequestMapping("/pratos")
public class PratoController {
    @Autowired
    private PratoRepository pratoRepository;

    @GetMapping
    public List<Prato> listarPratos() {
        return pratoRepository.findAll();
    }

    @PostMapping
    public Prato criarPrato(@RequestBody Prato prato){
        return pratoRepository.save(prato);
    }

    @PatchMapping("/{id}/ativar")
    public Prato ativarPrato(@PathVariable int id){
        Prato prato = pratoRepository.findById(id).orElseThrow();
        prato.ativarPrato();
        return pratoRepository.save(prato);
    }

    @PatchMapping("/{id}/desativar")
    public Prato desativarPrato(@PathVariable int id){
        Prato prato = pratoRepository.findById(id).orElseThrow();
        prato.desativarPrato();
        return pratoRepository.save(prato);
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<Prato> atualizarPrato(@PathVariable int id, @RequestBody Map<String, Object> campos) {
    
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> apagarPrato(@PathVariable int id) {

        if (!pratoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        pratoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
}
