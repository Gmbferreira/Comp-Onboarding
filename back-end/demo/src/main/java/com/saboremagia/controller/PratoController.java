package com.saboremagia.controller;

import com.saboremagia.model.Prato;
import com.saboremagia.repository.PratoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.util.ReflectionUtils;
import java.lang.reflect.Field;
import java.util.Map;



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

    @PutMapping("/{id}/ativar")
    public Prato ativarPrato(@PathVariable int id){
        Prato prato = pratoRepository.findById(id).orElseThrow();
        prato.ativarPrato();
        return pratoRepository.save(prato);
    }
    public Prato desativarPrato(@PathVariable int id){
        Prato prato = pratoRepository.findById(id).orElsethrow();
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
    
}
