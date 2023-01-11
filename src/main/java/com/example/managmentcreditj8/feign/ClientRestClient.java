package com.example.managmentcreditj8.feign;

import com.example.managmentcreditj8.model.ClientDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name ="client-account-service")
public interface ClientRestClient {
    @GetMapping("/clients")
    List<ClientDTO> getAllClient();
    @GetMapping("/clients/{id}")
    public ClientDTO getClient(@PathVariable(name = "id" )Long clientId);
}
