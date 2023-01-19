package com.example.operationlistener.service;

import com.example.operationlistener.entities.Operation;
import com.example.operationlistener.repo.OperationRepo;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.function.Consumer;

@Service
//@AllArgsConstructor
public class KafkaService {
    OperationRepo repo;

    public KafkaService(OperationRepo repo) {
        this.repo = repo;
    }

    @Bean
    public Consumer<Operation> operationConsumer() {
        System.out.println("je suis bien dans consumer");
        return (input)->{
            System.out.println("********************");
            System.out.println(input.toString());
            System.out.println("********************");
            repo.save(input);
        };
    }
}
