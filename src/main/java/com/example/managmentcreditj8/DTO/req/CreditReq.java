package com.example.managmentcreditj8.DTO.req;

import lombok.Data;


@Data
public class CreditReq {
    private double montant;
    private double dureeEnMois;
    private Long clientId;
}
