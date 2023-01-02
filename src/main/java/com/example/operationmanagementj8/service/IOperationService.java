package com.example.operationmanagementj8.service;

import com.example.operationmanagementj8.DTO.OperationDTO;
import com.example.operationmanagementj8.DTO.req.DebitCreditReq;
import com.example.operationmanagementj8.DTO.req.TransferReq;
import com.example.operationmanagementj8.Exception.CompteException;

import java.util.List;

public interface IOperationService {
    OperationDTO debit(DebitCreditReq req) throws CompteException;
    OperationDTO credit(DebitCreditReq req) throws CompteException;
    void transfer(TransferReq req) throws CompteException;
    List<OperationDTO> getAccountHistory(Long compteId) throws CompteException;
}
