package com.example.compteclientj8.DTO.req;

import lombok.Data;

@Data
public class CompteReq {
    private double balance;
    private Long clientId;
    private double overDraft;
    private double interestRate;
}
