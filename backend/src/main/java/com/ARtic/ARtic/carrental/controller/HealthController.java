package com.ARtic.ARtic.carrental.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/health")
    public String health() {
        return "{\"status\": \"UP\", \"service\": \"ARtic Car Rental API\"}";
    }

    @GetMapping("/api/test")
    public String test() {
        return "{\"message\": \"API está funcionando!\"}";
    }
}
