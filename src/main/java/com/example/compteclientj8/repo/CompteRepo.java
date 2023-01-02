package com.example.compteclientj8.repo;

import com.example.compteclientj8.entities.Compte;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompteRepo extends JpaRepository<Compte,Long> {
}
