package com.saboremagia.demo.model;

import java.util.List;

public class Cardapio {
    private List<Prato> prato;
    
    public List<Prato> getPrato(){
        return prato;
    }

    public void setPrato(List<Prato> prato){
        this.prato = prato;
    }
}
