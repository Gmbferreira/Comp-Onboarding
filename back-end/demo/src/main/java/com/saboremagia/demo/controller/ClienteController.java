package com.saboremagia.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saboremagia.demo.model.Cliente;
import com.saboremagia.demo.service.ClienteService;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping("/registro")
    public ResponseEntity<?> registrarCliente(@RequestBody Cliente cliente) {
        try {
            Cliente clienteSalvo = clienteService.registrarCliente(cliente);
            return ResponseEntity.ok(clienteSalvo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginCliente(@RequestBody Cliente cliente) {
        try {
            Cliente clienteLogado = clienteService.loginCliente(cliente.getEmail(), cliente.getSenha());
            return ResponseEntity.ok(clienteLogado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
}