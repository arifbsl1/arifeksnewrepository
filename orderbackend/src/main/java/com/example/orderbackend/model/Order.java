package com.example.orderbackend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;

    private int quantity;

    private double price;

    private LocalDate orderCreateDate;
    
    private LocalDate orderUpdateDate;
    

    // Getters and Setters
    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }
    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }


    public LocalDate getOrderUpdateDate() {
        return orderUpdateDate;
    }
    public void setOrderUpdateDate(LocalDate orderUpdateDate) {
        this.orderUpdateDate = orderUpdateDate;
    }

        public LocalDate getOrderCreateDate() {
        return orderCreateDate;
    }

    public void setOrderCreateDate(LocalDate orderCreateDate) {
        this.orderCreateDate = orderCreateDate;
    }
}