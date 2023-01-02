package com.example.operationmanagementj8.web;

import com.example.operationmanagementj8.DTO.OperationDTO;
import com.example.operationmanagementj8.DTO.req.DebitCreditReq;
import com.example.operationmanagementj8.DTO.req.TransferReq;
import com.example.operationmanagementj8.Exception.CompteException;
import com.example.operationmanagementj8.service.IOperationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@AllArgsConstructor
public class OperationRestClient {
    IOperationService service;

    @PostMapping("operations/debit")
    public OperationDTO debit(DebitCreditReq cdReq) throws CompteException {
        System.out.println("req web:"+cdReq);
        return service.debit(cdReq);
    }

    @PostMapping("operations/credit")
    public OperationDTO credit(DebitCreditReq cdReq) throws CompteException {
        return service.credit(cdReq);
    }

    @PostMapping("operations/transfer")
    public void transfer(TransferReq req) throws CompteException {
        service.transfer(req);
    }

    @GetMapping("operations/comptes/{id}")
    public List<OperationDTO> getAllByClientId(@PathVariable(name = "id") Long compteId) throws CompteException {
        return service.getAccountHistory(compteId);
    }
}
