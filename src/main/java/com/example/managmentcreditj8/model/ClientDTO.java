package com.example.managmentcreditj8.model;

import lombok.Data;

@Data
public class ClientDTO {
    private Long clientId;
    private String nom;
    private String prenom;
    private String email;
}
