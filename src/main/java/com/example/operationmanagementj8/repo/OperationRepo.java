package com.example.operationmanagementj8.repo;

import com.example.operationmanagementj8.entiries.Operation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OperationRepo extends JpaRepository<Operation,Long> {
    List<Operation> findAllByCompteId(Long compteId);
}
