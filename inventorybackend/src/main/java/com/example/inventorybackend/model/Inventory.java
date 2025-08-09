package com.example.inventorybackend.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "inventory")
@Data
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inventory_id;
    private Long productId;
    private String productname;
    private String sku;
    private int quantity_available;
    private int quantity_reserved;
    private int reorder_level;
    private String location;
    private String batch_number;
    private Integer quantityInStock;
    private String category;
    private String brand;
    private String imageUrl;
    private LocalDateTime expiry_date;
    private LocalDateTime last_stocked_date;
    private LocalDateTime last_updated;
    private String status;
    private int supplier_id;
    private double cost_price;
    private double selling_price;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
