package com.example.managmentcreditj8.feign;

import feign.RequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MyFeignConfiguration {
    @Bean
    public RequestInterceptor requestInterceptor() {
        return new MyRequestInterceptor();
    }
}

