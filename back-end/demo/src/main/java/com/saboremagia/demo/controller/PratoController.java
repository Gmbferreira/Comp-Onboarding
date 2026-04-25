package com.saboremagia.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.saboremagia.demo.model.Prato;
import com.saboremagia.demo.repository.PratoRepository;
import com.saboremagia.demo.service.PratoService;

@RestController
@RequestMapping("/pratos")
public class PratoController {
    @Autowired
    private PratoRepository pratoRepository;

    @Autowired
    private PratoService pratoService;

    @GetMapping
    public List<Prato> listarPratos() {
        return pratoRepository.findAll();
    }

    @GetMapping("/preco")
    public List<Prato> pratosPorPreco(@RequestParam float precoMin, @RequestParam float precoMax){
        return pratoService.pratosPorPreco(precoMin, precoMax);
    }

    @GetMapping("/categoria/{id}")
    public List<Prato> buscarPorCategoria(@PathVariable int id){
        return pratoService.buscarPorCategoria(id);
    }

    @PostMapping
    public Prato criarPrato(@RequestBody Prato prato){
        return pratoRepository.save(prato);
    }

    @PatchMapping("/{id}/ativar")
    public Prato ativarPrato(@PathVariable int id){
        return pratoService.ativarPrato(id);
    }

    @PatchMapping("/{id}/desativar")
    public Prato desativarPrato(@PathVariable int id){
        return pratoService.desativarPrato(id);
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<Prato> atualizarPrato(@PathVariable int id, @RequestBody Map<String, Object> campos) {
        return pratoService.atualizarPrato(id, campos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> apagarPrato(@PathVariable int id) {
        return pratoService.apagarPrato(id);
    }
}

