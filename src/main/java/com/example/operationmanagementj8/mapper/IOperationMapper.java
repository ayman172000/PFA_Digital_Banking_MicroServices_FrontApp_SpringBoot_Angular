package com.example.operationmanagementj8.mapper;

import com.example.operationmanagementj8.DTO.OperationDTO;
import com.example.operationmanagementj8.entiries.Operation;

public interface IOperationMapper {
    Operation fromOperationDTO(OperationDTO operationDTO);
    OperationDTO fromOperation(Operation operation);
}
