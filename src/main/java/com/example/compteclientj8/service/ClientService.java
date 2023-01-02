package com.example.compteclientj8.service;

import com.example.compteclientj8.DTO.ClientDTO;
import com.example.compteclientj8.DTO.req.ClientReq;
import com.example.compteclientj8.entities.Client;
import com.example.compteclientj8.exception.ClientException;
import com.example.compteclientj8.mapper.IClientMapper;
import com.example.compteclientj8.repo.ClientRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
@Transactional
public class ClientService implements IClientService {
    ClientRepo clientRepo;
    IClientMapper mapper;
    @Override
    public ClientDTO saveClient(ClientReq req) {
        Client client=new Client();
        client.setNom(req.getNom());
        client.setPrenom(req.getPrenom());
        client.setEmail(req.getEmail());
        Client save = clientRepo.save(client);
        return mapper.fromClient(save);
    }

    @Override
    public ClientDTO UpdateClient(ClientDTO clientDTO) throws ClientException {
        Client client = clientRepo.findById(clientDTO.getClientId()).orElse(null);
        if(client==null)
            throw new ClientException("client not found");
        Client save = clientRepo.save(mapper.fromClientDTO(clientDTO));
        return mapper.fromClient(save);
    }

    @Override
    public void deleteClient(Long clientID) throws ClientException {
        Client client = clientRepo.findById(clientID).orElse(null);
        if(client==null)
            throw new ClientException("client not found");
        clientRepo.delete(client);
    }

    @Override
    public ClientDTO getClient(Long clientID) throws ClientException {
        Client client = clientRepo.findById(clientID).orElse(null);
        if(client==null)
            throw new ClientException("client not found");
        return mapper.fromClient(client);
    }

    @Override
    public List<ClientDTO> getAllClient() {
        List<ClientDTO> collect = clientRepo.findAll().stream().map(data -> {
            return mapper.fromClient(data);
        }).collect(Collectors.toList());
        return collect;
    }
}
