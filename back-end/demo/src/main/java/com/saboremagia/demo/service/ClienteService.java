package com.saboremagia.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.saboremagia.demo.model.Cliente;
import com.saboremagia.demo.repository.ClienteRepository;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente registrarCliente(Cliente cliente) {
        // Verificar se o email já existe
        if (clienteRepository.findByEmail(cliente.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }
        
        return clienteRepository.save(cliente); //salva cliente
    }
    public Cliente loginCliente(String email, String senha){
        return clienteRepository.findByEmail(email)
                .filter(cliente -> cliente.getSenha().equals(senha))
                .orElseThrow(() -> new RuntimeException("Email ou senha inválidos"));
    }
}