package com.example.operationmanagementj8;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class OperationManagementJ8Application {

	public static void main(String[] args) {
		SpringApplication.run(OperationManagementJ8Application.class, args);
	}

}
