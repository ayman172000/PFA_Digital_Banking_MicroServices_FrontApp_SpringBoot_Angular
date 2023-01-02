package com.example.managmentcreditj8.service;

import com.example.managmentcreditj8.DTO.CreditDTO;
import com.example.managmentcreditj8.DTO.req.CreditReq;
import com.example.managmentcreditj8.exception.CreditException;

import java.util.List;

public interface ICreditService {
    CreditDTO saveCredit(CreditReq req);
    List<CreditDTO> getAllCredit();
    CreditDTO getCredit(Long creditId) throws CreditException;
}
