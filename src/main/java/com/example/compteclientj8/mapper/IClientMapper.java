package com.example.compteclientj8.mapper;


import com.example.compteclientj8.DTO.ClientDTO;
import com.example.compteclientj8.DTO.CompteDTO;
import com.example.compteclientj8.entities.Compte;
import com.example.compteclientj8.entities.Client;

public interface IClientMapper {
    Client fromClientDTO(ClientDTO clientDTO);
    ClientDTO fromClient(Client client);

    Compte fromCompteDTO(CompteDTO compteDTO);
    CompteDTO fromCompte(Compte compte);
}
