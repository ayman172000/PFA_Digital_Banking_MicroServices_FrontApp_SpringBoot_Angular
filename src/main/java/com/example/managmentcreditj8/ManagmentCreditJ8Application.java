package com.example.managmentcreditj8;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ManagmentCreditJ8Application {

	public static void main(String[] args) {
		SpringApplication.run(ManagmentCreditJ8Application.class, args);
	}

}
