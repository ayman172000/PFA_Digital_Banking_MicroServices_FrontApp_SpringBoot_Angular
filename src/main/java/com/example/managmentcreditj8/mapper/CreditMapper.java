package com.example.managmentcreditj8.mapper;

import com.example.managmentcreditj8.DTO.CreditDTO;
import com.example.managmentcreditj8.entities.Credit;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class CreditMapper implements ICreditMapper {
    @Override
    public Credit fromCreditDTO(CreditDTO creditDTO) {
        Credit credit=new Credit();
        BeanUtils.copyProperties(creditDTO,credit);
        credit.setClient(creditDTO.getClient());
        return credit;
    }

    @Override
    public CreditDTO fromCredit(Credit credit) {
        CreditDTO creditDTO=new CreditDTO();
        BeanUtils.copyProperties(credit,creditDTO);
        creditDTO.setClient(credit.getClient());
        return creditDTO;
    }
}
