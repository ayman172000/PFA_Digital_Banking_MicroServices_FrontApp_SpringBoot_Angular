package com.example.operationmanagementj8.feign;

import feign.RequestInterceptor;
import feign.RequestTemplate;

public class MyRequestInterceptor implements RequestInterceptor {
    @Override
    public void apply(RequestTemplate template) {
        System.out.println("request bien interceptée:"+template.request());
        // Ajoutez votre en-tête ici
        template.header("mon-en-tete", "ma-valeur");
    }
}

