package com.saboremagia.controller;

import com.saboremagia.model.Prato;
import com.saboremagia.repository.PratoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



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
    public Prato ativar(@PathVariable int id){
        Prato prato = pratoRepository.findById(id).orElseThrow();
        prato.ativarPrato();
        return pratoRepository.save(prato);
    }
    
    
}
