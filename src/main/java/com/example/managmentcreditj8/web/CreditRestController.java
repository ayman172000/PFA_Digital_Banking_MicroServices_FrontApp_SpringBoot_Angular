package com.example.managmentcreditj8.web;

import com.example.managmentcreditj8.DTO.CreditDTO;
import com.example.managmentcreditj8.DTO.req.CreditReq;
import com.example.managmentcreditj8.exception.CreditException;
import com.example.managmentcreditj8.service.ICreditService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
public class CreditRestController {
    ICreditService service;

    @GetMapping("/credits")
    public List<CreditDTO> getAllCredit()
    {
        return service.getAllCredit();
    }

    @GetMapping("/credits/{id}")
    public CreditDTO getCredit(@PathVariable(name = "id") Long creditId) throws CreditException {
        return service.getCredit(creditId);
    }

    @PostMapping("/credits")
    public CreditDTO saveCredit(@RequestBody CreditReq req)
    {
        return service.saveCredit(req);
    }
}
