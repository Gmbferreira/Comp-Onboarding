package com.saboremagia.demo.controller;

import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.saboremagia.demo.model.Prato;
import com.saboremagia.demo.service.PratoService;
import java.util.Base64;

@RestController
@RequestMapping("/pratos")
@CrossOrigin(origins = "http://localhost:3000")
public class PratoController {

    @Autowired
    private PratoService pratoService;

    @GetMapping
    public List<Prato> listarPratos() {
        return pratoService.listarPratos();
    }

    @GetMapping("/preco")
    public List<Prato> pratosPorPreco(@RequestParam float precoMin, @RequestParam float precoMax){
        return pratoService.pratosPorPreco(precoMin, precoMax);
    }

    @GetMapping("/categoria/{id}")
    public List<Prato> buscarPorCategoria(@PathVariable int id){
        return pratoService.buscarPorCategoria(id);
    }

    
    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public Prato criarPrato(
            @RequestPart("prato") String pratoJson,
            @RequestPart(value = "file", required = false) MultipartFile file) throws Exception {
        
        
        ObjectMapper objectMapper = new ObjectMapper();
        Prato prato = objectMapper.readValue(pratoJson, Prato.class);

        
        if (file != null && !file.isEmpty()) {
            String base64 = Base64.getEncoder().encodeToString(file.getBytes());
            prato.setImagem("data:" + file.getContentType() + ";base64," + base64);
        }

        return pratoService.criarPrato(prato);
    }

    @PatchMapping("/{id}/ativar")
    public Prato ativarPrato(@PathVariable int id){
        return pratoService.ativarPrato(id);
    }

    @PatchMapping("/{id}/desativar")
    public Prato desativarPrato(@PathVariable int id){
        return pratoService.desativarPrato(id);
    }
    
    
    @PatchMapping(value = "/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Prato> atualizarPrato(
            @PathVariable int id, 
            @RequestPart("prato") String pratoJson,
            @RequestPart(value = "file", required = false) MultipartFile file) throws Exception {
        
        ObjectMapper objectMapper = new ObjectMapper();
        java.util.Map<String, Object> campos = objectMapper.readValue(pratoJson, java.util.Map.class);

        if (file != null && !file.isEmpty()) {
            String base64 = Base64.getEncoder().encodeToString(file.getBytes());
            campos.put("imagem", "data:" + file.getContentType() + ";base64," + base64);
        }

        return pratoService.atualizarPrato(id, campos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> apagarPrato(@PathVariable int id) {
        return pratoService.apagarPrato(id);
    }
}