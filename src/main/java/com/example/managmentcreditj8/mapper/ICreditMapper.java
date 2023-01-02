package com.example.managmentcreditj8.mapper;

import com.example.managmentcreditj8.DTO.CreditDTO;
import com.example.managmentcreditj8.entities.Credit;

public interface ICreditMapper {
    Credit fromCreditDTO(CreditDTO creditDTO);
    CreditDTO fromCredit(Credit credit);
}
