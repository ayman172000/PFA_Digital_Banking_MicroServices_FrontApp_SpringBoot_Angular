package com.example.operationmanagementj8.DTO.req;

import lombok.Data;

@Data
public class DebitCreditReq {
    private Long compteId;
    private double montant;
    private String descr;
}
