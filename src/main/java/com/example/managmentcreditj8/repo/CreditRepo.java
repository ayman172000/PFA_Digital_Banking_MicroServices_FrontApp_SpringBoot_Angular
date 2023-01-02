package com.example.managmentcreditj8.repo;

import com.example.managmentcreditj8.entities.Credit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CreditRepo extends JpaRepository<Credit,Long> {
}
