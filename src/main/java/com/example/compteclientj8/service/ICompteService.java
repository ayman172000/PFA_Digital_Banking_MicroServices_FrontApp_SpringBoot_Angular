package com.example.compteclientj8.service;

import com.example.compteclientj8.DTO.CompteDTO;
import com.example.compteclientj8.DTO.req.CompteReq;
import com.example.compteclientj8.exception.ClientException;
import com.example.compteclientj8.exception.CompteException;

import java.util.List;

public interface ICompteService {
    CompteDTO getCompte(Long compteId) throws CompteException;
    List<CompteDTO> getAllCompte();
    CompteDTO saveCompte(CompteReq req) throws ClientException;

    CompteDTO updateCompte(CompteDTO compteDTO) throws CompteException;

    List<CompteDTO> getAllAccounts(Long clientId) throws ClientException;
}
