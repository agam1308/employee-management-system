package com.employeemanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmployeeManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmployeeManagementApplication.class, args);
        System.out.println("\n===========================================");
        System.out.println("Employee Management System Demo is running!");
        System.out.println("Access the application at: http://localhost:8080");
        System.out.println("===========================================\n");
    }
}
