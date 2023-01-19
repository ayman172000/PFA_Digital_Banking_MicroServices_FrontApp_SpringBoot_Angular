package com.example.compteclientj8.mapper;

import com.example.compteclientj8.DTO.ClientDTO;
import com.example.compteclientj8.DTO.CompteCourantDTO;
import com.example.compteclientj8.DTO.CompteDTO;
import com.example.compteclientj8.DTO.CompteEpargneDTO;
import com.example.compteclientj8.entities.Client;
import com.example.compteclientj8.entities.Compte;
import com.example.compteclientj8.entities.CompteCourant;
import com.example.compteclientj8.entities.CompteEpargne;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class ClientMapper implements  IClientMapper{
    @Override
    public Client fromClientDTO(ClientDTO clientDTO) {
        Client client=new Client();
        BeanUtils.copyProperties(clientDTO,client);
        return client;
    }

    @Override
    public ClientDTO fromClient(Client client) {
        ClientDTO clientDTO=new ClientDTO();
        BeanUtils.copyProperties(client,clientDTO);
        return clientDTO;
    }

    @Override
    public Compte fromCompteDTO(CompteDTO compteDTO) {
        if(compteDTO instanceof CompteCourantDTO)
        {
            CompteCourant compteCourant=new CompteCourant();
            BeanUtils.copyProperties(compteDTO,compteCourant);
            compteCourant.setClient(this.fromClientDTO(compteDTO.getClient()));
            return compteCourant;
        }
        else {
            //System.out.println("je suis un compte epargne");
            CompteEpargne compteEpargne = new CompteEpargne();
            BeanUtils.copyProperties(compteDTO,compteEpargne);
            compteEpargne.setClient(this.fromClientDTO(compteDTO.getClient()));
            return compteEpargne;
        }
    }

    @Override
    public CompteDTO fromCompte(Compte compte) {
        //System.out.println("compte in mapper:"+compte);
        if(compte instanceof CompteCourant)
        {
            CompteCourantDTO  compteCourant=new CompteCourantDTO();
            BeanUtils.copyProperties(compte,compteCourant);
            compteCourant.setClient(this.fromClient(compte.getClient()));
            return compteCourant;
        }
        else {
            //System.out.println("je suis un compte epargne");
            CompteEpargneDTO compteEpargne = new CompteEpargneDTO();
            BeanUtils.copyProperties(compte,compteEpargne);
            compteEpargne.setClient(this.fromClient(compte.getClient()));
            return compteEpargne;
        }
    }
}
