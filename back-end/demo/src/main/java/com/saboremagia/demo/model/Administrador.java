package com.saboremagia.demo.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("Administrador")
public class Administrador  extends Usuario {
    
}
