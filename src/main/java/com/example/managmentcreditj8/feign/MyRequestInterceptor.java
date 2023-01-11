package com.example.managmentcreditj8.feign;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.keycloak.KeycloakPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.security.Principal;
import java.util.Collection;

public class MyRequestInterceptor implements RequestInterceptor {
    @Override
    public void apply(RequestTemplate template) {
        Collection<String> authorization = template.request().headers().get("Authorization");
        System.out.println("request bien interceptée:"+template.request());
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        Principal principal = (Principal) authentication.getPrincipal();
        KeycloakPrincipal principalKeycloack= (KeycloakPrincipal) principal;
        String accessToken = principalKeycloack.getKeycloakSecurityContext().getTokenString();
        System.out.println("token:"+accessToken);
        // Ajoutez votre en-tête ici
        template.header("Authorization", "Bearer "+accessToken);
    }


}

