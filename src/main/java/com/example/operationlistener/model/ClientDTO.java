package com.example.operationlistener.model;

import lombok.Data;

@Data
public class ClientDTO {

    private Long clientId;
    private String nom;
    private String prenom;
    private String email;
}
