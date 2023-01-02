package com.example.operationmanagementj8.DTO.req;

import lombok.Data;

@Data
public class TransferReq {
    private Long compteIdSrc;
    private Long compteIdDest;
    private double montant;
    private String description;
}
