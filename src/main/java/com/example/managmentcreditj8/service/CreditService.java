package com.example.managmentcreditj8.service;

import com.example.managmentcreditj8.DTO.CreditDTO;
import com.example.managmentcreditj8.DTO.req.CreditReq;
import com.example.managmentcreditj8.entities.Credit;
import com.example.managmentcreditj8.exception.CreditException;
import com.example.managmentcreditj8.feign.ClientRestClient;
import com.example.managmentcreditj8.mapper.ICreditMapper;
import com.example.managmentcreditj8.model.ClientDTO;
import com.example.managmentcreditj8.repo.CreditRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
@Transactional
public class CreditService implements ICreditService {
    CreditRepo creditRepo;
    ClientRestClient restClient;
    ICreditMapper mapper;
    @Override
    public CreditDTO saveCredit(CreditReq req) {
        Credit credit=new Credit();
        ClientDTO client = restClient.getClient(req.getClientId());
        credit.setClient(client);
        credit.setClientId(client.getClientId());
        credit.setMontant(req.getMontant());
        credit.setCreatedAt(new Date());
        credit.setDureeEnMois(req.getDureeEnMois());
        Credit save = creditRepo.save(credit);
        return mapper.fromCredit(save);
    }

    @Override
    public List<CreditDTO> getAllCredit() {
        List<CreditDTO> collect = creditRepo.findAll().stream().map(data -> {
            data.setClient(restClient.getClient(data.getClientId()));
            return mapper.fromCredit(data);
        }).collect(Collectors.toList());
        return collect;
    }

    @Override
    public CreditDTO getCredit(Long creditId) throws CreditException {

        Credit credit = creditRepo.findById(creditId).orElse(null);
        if(credit==null)
            throw new CreditException("credit not found");
        credit.setClient(restClient.getClient(credit.getClientId()));
        return mapper.fromCredit(credit);
    }
}
