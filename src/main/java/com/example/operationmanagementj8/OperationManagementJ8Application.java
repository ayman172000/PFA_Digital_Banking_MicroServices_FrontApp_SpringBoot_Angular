package com.example.operationmanagementj8;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
@OpenAPIDefinition
public class OperationManagementJ8Application {

	public static void main(String[] args) {
		SpringApplication.run(OperationManagementJ8Application.class, args);
	}

}
