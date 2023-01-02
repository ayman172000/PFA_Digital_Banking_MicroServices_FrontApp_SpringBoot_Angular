package com.example.operationmanagementj8.feign;

import com.example.operationmanagementj8.model.CompteDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@FeignClient(name ="client-account-service")
public interface ClientRestClient {
    @GetMapping("/comptes/{id}")
    CompteDTO getCompte(@PathVariable(name = "id") Long compteId);
    @PutMapping("/comptes/{id}")
    CompteDTO updateCompte(@PathVariable(name = "id") Long compteId,
                           @RequestBody CompteDTO compteDTO);
}
