package com.example.compteclientj8.web;

import com.example.compteclientj8.DTO.CompteDTO;
import com.example.compteclientj8.DTO.req.CompteReq;
import com.example.compteclientj8.exception.ClientException;
import com.example.compteclientj8.exception.CompteException;
import com.example.compteclientj8.service.ICompteService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
//@CrossOrigin("*")
public class CompteRestController {
    ICompteService service;

    @GetMapping("/comptes")
    List<CompteDTO> getAllComptes()
    {
        return service.getAllCompte();
    }

    @GetMapping("/comptes/{id}")
    CompteDTO getCompte(@PathVariable(name = "id")Long compteId) throws CompteException {
        //System.out.println("je suis dans @GetMapping(\"/comptes\")");
        //System.out.println("result:"+service.getCompte(compteId));
        return service.getCompte(compteId);
    }

    @PostMapping("/comptes")
    CompteDTO saveCompte(@RequestBody CompteReq req) throws ClientException {
        //System.out.println("req:"+req);
        return service.saveCompte(req);
    }

    @PutMapping("/comptes/{id}")
    public CompteDTO updateCompte(@PathVariable(name = "id")Long compteId,@RequestBody CompteDTO compteDTO)
    {
        //System.out.println("je suis dans @PutMapping(\"/comptes/{id}\")");
        //System.out.println("result:"+service.updateCompte(compteDTO));
        compteDTO.setCompteId(compteId);
        return service.updateCompte(compteDTO);
    }

    @GetMapping("/comptes/clients/{id}")
    public List<CompteDTO> getAllAccountsByClientId(@PathVariable(name = "id") Long clientId) throws ClientException {
        return  service.getAllAccounts(clientId);
    }
}
