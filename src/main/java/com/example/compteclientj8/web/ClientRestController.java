package com.example.compteclientj8.web;

import com.example.compteclientj8.DTO.ClientDTO;
import com.example.compteclientj8.DTO.req.ClientReq;
import com.example.compteclientj8.exception.ClientException;
import com.example.compteclientj8.service.IClientService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
public class ClientRestController {
    IClientService service;
    @GetMapping("/clients")
    public List<ClientDTO> getAllClient(){
        return service.getAllClient();
    }

    @GetMapping("/clients/{id}")
    public ClientDTO getClient(@PathVariable(name = "id") Long clientId) throws ClientException {
        return service.getClient(clientId);
    }
    @PutMapping("/clients/{id}")
    public ClientDTO updateClient(@PathVariable(name = "id") Long clientId, @RequestBody ClientDTO clientDTO) throws ClientException {
        clientDTO.setClientId(clientId);
        return service.UpdateClient(clientDTO);
    }

    @PostMapping("/clients")
    public ClientDTO saveClient(@RequestBody ClientReq req)
    {
        return service.saveClient(req);
    }

    @DeleteMapping("/clients/{id}")
    void deleteClient(@PathVariable(name = "id") Long clientId) throws ClientException {
        service.deleteClient(clientId);
    }
}
