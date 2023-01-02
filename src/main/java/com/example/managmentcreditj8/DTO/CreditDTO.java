package com.example.managmentcreditj8.DTO;

import com.example.managmentcreditj8.model.ClientDTO;
import lombok.Data;

import java.util.Date;

@Data
public class CreditDTO {
    private Long CreditId;
    private double montant;
    private double dureeEnMois;
    private Date createdAt;
    private ClientDTO client;
}
