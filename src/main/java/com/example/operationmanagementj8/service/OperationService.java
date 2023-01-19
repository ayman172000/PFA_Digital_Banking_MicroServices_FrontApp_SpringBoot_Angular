package com.example.operationmanagementj8.service;

import com.example.operationmanagementj8.DTO.OperationDTO;
import com.example.operationmanagementj8.DTO.req.*;
import com.example.operationmanagementj8.Exception.CompteException;
import com.example.operationmanagementj8.entiries.Operation;
import com.example.operationmanagementj8.enums.OperationType;
import com.example.operationmanagementj8.feign.ClientRestClient;
import com.example.operationmanagementj8.mapper.IOperationMapper;
import com.example.operationmanagementj8.model.CompteCourantDTO;
import com.example.operationmanagementj8.model.CompteDTO;
import com.example.operationmanagementj8.repo.OperationRepo;
import lombok.AllArgsConstructor;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class OperationService implements IOperationService {
    ClientRestClient restClient;
    OperationRepo operationRepo;
    IOperationMapper mapper;
    private StreamBridge streamBridge;
    @Override
    public OperationDTO debit(DebitCreditReq req) throws CompteException {
        //System.out.println("req:"+req);
        CompteDTO compte = restClient.getCompte(req.getCompteId());
        if(compte==null)
            throw new CompteException("compte not found");
        OperationDTO operationDTO=new OperationDTO();
        if(compte instanceof CompteCourantDTO)
        {
            if(((CompteCourantDTO) compte).getOverDraft()+compte.getBalance()>= req.getMontant())
            {
                operationDTO.setAmount(req.getMontant());
                compte.setBalance(compte.getBalance()- req.getMontant());
            }
            else {
                throw new  CompteException("insuficient balance");
            }
        }
        else {
            if(compte.getBalance()>= req.getMontant())
            {
                operationDTO.setAmount(req.getMontant());
                compte.setBalance(compte.getBalance()- req.getMontant());
            }
            else {
                throw new  CompteException("insuficient balance");
            }
        }
        operationDTO.setType(OperationType.DEBIT);
        operationDTO.setOperationDate(new Date());
        operationDTO.setDescription(req.getDescr());
        operationDTO.setCompte(compte);
        operationDTO.setCompteId(compte.getCompteId());
        restClient.updateCompte(compte.getCompteId(), compte);
        //Operation save = operationRepo.save(mapper.fromOperationDTO(operationDTO));
        Operation save = mapper.fromOperationDTO(operationDTO);
        streamBridge.send("R1",save);
        return mapper.fromOperation(save);
    }

    @Override
    public OperationDTO credit(DebitCreditReq req) throws CompteException {
        CompteDTO compte = restClient.getCompte(req.getCompteId());
        if(compte==null)
            throw new CompteException("compte not found");
        OperationDTO operationDTO=new OperationDTO();
        operationDTO.setCompte(compte);
        operationDTO.setType(OperationType.CREDIT);
        operationDTO.setOperationDate(new Date());
        operationDTO.setAmount(req.getMontant());
        operationDTO.setDescription(req.getDescr());
        operationDTO.setCompteId(compte.getCompteId());
        compte.setBalance(compte.getBalance()- req.getMontant());
        restClient.updateCompte(compte.getCompteId(), compte);
        //Operation save = operationRepo.save(mapper.fromOperationDTO(operationDTO));
        Operation save = mapper.fromOperationDTO(operationDTO);
        streamBridge.send("R1",save);
        return mapper.fromOperation(save);
    }

    @Override
    public void transfer(TransferReq req) throws CompteException {
        DebitCreditReq cdReq=new DebitCreditReq();
        cdReq.setDescr(req.getDescription());
        cdReq.setCompteId(req.getCompteIdSrc());
        cdReq.setMontant(req.getMontant());
        debit(cdReq);
        cdReq.setCompteId(req.getCompteIdDest());
        credit(cdReq);
    }

    @Override
    public List<OperationDTO> getAccountHistory(Long compteId) throws CompteException {
        CompteDTO compte = restClient.getCompte(compteId);
        if(compte==null)
            throw new CompteException("compte not found");
        List<OperationDTO> collect = operationRepo.findAllByCompteId(compteId).stream().map(data -> {
            data.setCompte(restClient.getCompte(compteId));
            return mapper.fromOperation(data);
        }).collect(Collectors.toList());
        return collect;
    }
}
