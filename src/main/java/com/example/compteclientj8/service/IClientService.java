package com.example.compteclientj8.service;

import com.example.compteclientj8.DTO.ClientDTO;
import com.example.compteclientj8.DTO.req.ClientReq;
import com.example.compteclientj8.exception.ClientException;

import java.util.List;

public interface IClientService {
    ClientDTO saveClient(ClientReq req);
    ClientDTO UpdateClient(ClientDTO clientDTO) throws ClientException;
    void deleteClient(Long clientID) throws ClientException;
    ClientDTO getClient(Long clientID) throws ClientException;
    List<ClientDTO> getAllClient();
}
