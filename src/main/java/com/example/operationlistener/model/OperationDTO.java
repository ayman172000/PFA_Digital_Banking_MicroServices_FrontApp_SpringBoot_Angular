package com.example.operationlistener.model;

import com.example.operationlistener.enu.OperationType;

import java.util.Date;

public class OperationDTO {
    private Long operationId;
    private Date operationDate;
    private double amount;
    //@Enumerated(EnumType.STRING)
    private OperationType type;
    private Long compteId;
    private CompteDTO compte;
    private String description;
}
