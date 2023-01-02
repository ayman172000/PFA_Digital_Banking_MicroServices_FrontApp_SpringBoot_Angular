package com.example.operationmanagementj8.DTO;

import com.example.operationmanagementj8.enums.OperationType;
import com.example.operationmanagementj8.model.CompteDTO;
import lombok.Data;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.Date;

@Data
public class OperationDTO {
    private Long operationId;
    private Date operationDate;
    private double amount;
    @Enumerated(EnumType.STRING)
    private OperationType type;
    private CompteDTO compte;
    private String description;
}
