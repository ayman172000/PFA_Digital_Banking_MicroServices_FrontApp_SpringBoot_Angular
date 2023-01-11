package com.example.compteclientj8.DTO;

import com.example.compteclientj8.enmus.AccountStatus;
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
