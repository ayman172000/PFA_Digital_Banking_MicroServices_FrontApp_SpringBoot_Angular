package com.example.compteclientj8.repo;

import com.example.compteclientj8.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepo extends JpaRepository<Client,Long> {
}
