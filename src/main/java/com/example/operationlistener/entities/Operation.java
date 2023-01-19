package com.example.operationlistener.entities;

import com.example.operationlistener.enu.OperationType;
import com.example.operationlistener.model.CompteDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@AllArgsConstructor @NoArgsConstructor @Data

public class Operation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long operationId;
    private Date operationDate;
    private double amount;
    @Enumerated(EnumType.STRING)
    private OperationType type;
    private Long compteId;
    @Transient
    private CompteDTO compte;
    private String description;
}
