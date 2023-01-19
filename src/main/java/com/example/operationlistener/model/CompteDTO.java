package com.example.operationlistener.model;

import com.example.operationlistener.enu.AccountStatus;
import lombok.Data;

import java.util.Date;

@Data
public  class CompteDTO {
    private Long compteId;
    private double balance;
    private Date createdAt;
    private AccountStatus status;
    private ClientDTO client;
}
