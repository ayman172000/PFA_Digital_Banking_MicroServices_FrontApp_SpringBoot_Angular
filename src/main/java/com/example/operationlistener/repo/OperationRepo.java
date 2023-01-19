package com.example.operationlistener.repo;

import com.example.operationlistener.entities.Operation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OperationRepo extends JpaRepository<Operation,Long> {
    List<Operation> findAllByCompteId(Long compteId);
}
