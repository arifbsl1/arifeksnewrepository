package com.example.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;
import lombok.Data;

@Entity
@Data
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name cannot be empty")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Email should be a valid format")
    private String email;

    @NotBlank(message = "Department cannot be empty")
    private String department;

    @Min(value = 18, message = "Age should not be less than 18")
    @Max(value = 65, message = "Age should not be greater than 65")
    private int age;

    @PositiveOrZero(message = "Salary must be a positive number or zero")
    private double salary;
}