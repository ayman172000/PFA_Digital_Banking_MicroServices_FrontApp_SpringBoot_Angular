package com.example.operationmanagementj8.mapper;

import com.example.operationmanagementj8.DTO.OperationDTO;
import com.example.operationmanagementj8.entiries.Operation;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
@Service
public class OperationMapper implements IOperationMapper {
    @Override
    public Operation fromOperationDTO(OperationDTO operationDTO) {
        Operation operation=new Operation();
        BeanUtils.copyProperties(operationDTO,operation);
        operation.setCompte(operationDTO.getCompte());
        return operation;
    }

    @Override
    public OperationDTO fromOperation(Operation operation) {
        OperationDTO operationDTO=new OperationDTO();
        BeanUtils.copyProperties(operation,operationDTO);
        operationDTO.setCompte(operation.getCompte());
        return operationDTO;
    }
}
