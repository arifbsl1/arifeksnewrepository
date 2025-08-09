package com.example.app.controller;

import com.example.app.model.Employee;
import com.example.app.repository.EmployeeRepository;


import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular app
public class EmployeeController {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        logger.info("Fetching employee with id: {}", id);
        return employeeRepository.findById(id)
                .map(ResponseEntity::ok)
                            .orElse(ResponseEntity.notFound().build());
                
    }

    @PostMapping
    public Employee createEmployee(@Valid @RequestBody Employee employee) {
        logger.info("Creating new employee: {}", employee);
        return employeeRepository.save(employee);
    }

    @PutMapping("/{id}")
       public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @Valid @RequestBody Employee employeeDetails) {
         return employeeRepository.findById(id)
                .map(employee -> {
                    employee.setName(employeeDetails.getName());
                    employee.setEmail(employeeDetails.getEmail());
                    employee.setDepartment(employeeDetails.getDepartment());
                    employee.setAge(employeeDetails.getAge());
                    employee.setSalary(employeeDetails.getSalary());
                    return ResponseEntity.ok(employeeRepository.save(employee));
                })
                .orElse(ResponseEntity.notFound().build());
            }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        return employeeRepository.findById(id)
                .map(employee -> {
                    employeeRepository.delete(employee);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}