package com.saboremagia.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saboremagia.demo.model.Administrador;
import com.saboremagia.demo.service.AdministradorService;


@RestController
@RequestMapping("/administrador")
public class AdministradorController {
    
    @Autowired
    private AdministradorService administradorService;

    @PostMapping("/registro")
    public ResponseEntity<?> registrarAdministrador(@RequestBody Administrador administrador) {
        try {
            Administrador administradorSalvo = administradorService.registrarAdministrador(administrador);
            return ResponseEntity.ok(administradorSalvo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginAdministrador(@RequestBody Administrador administrador) {
        try {
            Administrador administradorLogado = administradorService.loginAdministrador(administrador.getEmail(), administrador.getSenha());
            return ResponseEntity.ok(administradorLogado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
