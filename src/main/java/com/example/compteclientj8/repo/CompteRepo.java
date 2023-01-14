package com.example.compteclientj8.repo;

import com.example.compteclientj8.entities.Compte;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompteRepo extends JpaRepository<Compte,Long> {
    List<Compte> findAllByClient_ClientId(Long clientId);
}
