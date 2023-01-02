package com.example.operationmanagementj8.model;

import com.example.operationmanagementj8.enums.AccountStatus;
import lombok.Data;

import java.util.Date;

@Data
public abstract class CompteDTO {
    private Long compteId;
    private double balance;
    private Date createdAt;
    private AccountStatus status;
    private ClientDTO client;
}
