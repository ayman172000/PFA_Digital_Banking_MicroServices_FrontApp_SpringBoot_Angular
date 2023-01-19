package com.example.compteclientj8.service;

import com.example.compteclientj8.DTO.ClientDTO;
import com.example.compteclientj8.DTO.CompteDTO;
import com.example.compteclientj8.DTO.req.CompteReq;
import com.example.compteclientj8.enmus.AccountStatus;
import com.example.compteclientj8.entities.Compte;
import com.example.compteclientj8.entities.CompteCourant;
import com.example.compteclientj8.entities.CompteEpargne;
import com.example.compteclientj8.exception.ClientException;
import com.example.compteclientj8.exception.CompteException;
import com.example.compteclientj8.mapper.IClientMapper;
import com.example.compteclientj8.repo.CompteRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class CompteService implements ICompteService {
    CompteRepo compteRepo;
    IClientMapper mapper;
    IClientService clientService;
    @Override
    public CompteDTO getCompte(Long compteId) throws CompteException {
        Compte compte = compteRepo.findById(compteId).orElse(null);
        if(compte==null)
            throw new CompteException("compte not found");
        return mapper.fromCompte(compte);
    }

    @Override
    public List<CompteDTO> getAllCompte() {
        List<CompteDTO> collect = compteRepo.findAll().stream().map(data -> {
            return mapper.fromCompte(data);
        }).collect(Collectors.toList());
        return collect;
    }

    @Override
    public CompteDTO saveCompte(CompteReq req) throws ClientException {
        ClientDTO client = clientService.getClient(req.getClientId());
        if(req.getOverDraft()==0)
        {
            CompteEpargne compte=new CompteEpargne();
            compte.setBalance(req.getBalance());
            compte.setStatus(AccountStatus.CREATED);
            compte.setCreatedAt(new Date());
            compte.setInterestRate(req.getInterestRate());
            compte.setClient(mapper.fromClientDTO(client));
            CompteEpargne save = compteRepo.save(compte);
            return mapper.fromCompte(save);
        }
        else
        {
            CompteCourant compte=new CompteCourant();
            compte.setBalance(req.getBalance());
            compte.setStatus(AccountStatus.CREATED);
            compte.setCreatedAt(new Date());
            compte.setOverDraft(req.getOverDraft());
            compte.setClient(mapper.fromClientDTO(client));
            CompteCourant save = compteRepo.save(compte);
            return mapper.fromCompte(save);
        }
    }

    @Override
    public CompteDTO updateCompte(CompteDTO compteDTO) throws CompteException {
        Compte compte = compteRepo.findById(compteDTO.getCompteId()).orElseThrow(() -> {
            return new CompteException("compte not found");
        });
        Compte save = compteRepo.save(compte);
        return mapper.fromCompte(save);
    }

    @Override
    public List<CompteDTO> getAllAccounts(Long clientId) throws ClientException {
        ClientDTO client = clientService.getClient(clientId);
        List<CompteDTO> collect = compteRepo.findAllByClient_ClientId(clientId).stream().map(data -> {
            return mapper.fromCompte(data);
        }).collect(Collectors.toList());
        return collect;
    }


}
