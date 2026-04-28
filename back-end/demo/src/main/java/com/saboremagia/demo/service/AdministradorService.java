package com.saboremagia.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.saboremagia.demo.model.Administrador;
import com.saboremagia.demo.repository.AdministradorRepository;

@Service
public class AdministradorService {

    @Autowired
    private AdministradorRepository administradorRepository;

    public Administrador registrarAdministrador(Administrador administrador){

        if (administradorRepository.findByEmail(administrador.getEmail()).isPresent()){
            throw new RuntimeException("Email já cadastrado");
        }
        return administradorRepository.save(administrador);
    }
    
    public Administrador loginAdministrador(String email, String senha){
        return administradorRepository.findByEmail(email)
                .filter(adiministrador -> adiministrador.getSenha().equals(senha))
                .orElseThrow(() -> new RuntimeException("Email ou senha inválidos"));
    }
    
}
