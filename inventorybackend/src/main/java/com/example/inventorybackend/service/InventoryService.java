package com.example.inventorybackend.service;

import com.example.inventorybackend.model.Inventory;
import com.example.inventorybackend.repository.InventoryRepository;
import com.example.inventorybackend.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public List<Inventory> getAllInventories() {
        return inventoryRepository.findAll();
    }

    public Inventory getInventoryById(Long id) {
        return inventoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory not found with id: " + id));
    }

    public Inventory createInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    public Inventory updateInventory(Long id, Inventory inventoryDetails) {
        Inventory inventory = getInventoryById(id);
        inventory.setProductId(inventoryDetails.getProductId());
        inventory.setProductname(inventoryDetails.getProductname());
        inventory.setSku(inventoryDetails.getSku());
        inventory.setQuantity_available(inventoryDetails.getQuantity_available());
        inventory.setQuantity_reserved(inventoryDetails.getQuantity_reserved());
        inventory.setReorder_level(inventoryDetails.getReorder_level());
        inventory.setLocation(inventoryDetails.getLocation());
        inventory.setBatch_number(inventoryDetails.getBatch_number());
        inventory.setQuantityInStock(inventoryDetails.getQuantityInStock());
        inventory.setCategory(inventoryDetails.getCategory());
        inventory.setBrand(inventoryDetails.getBrand());
        inventory.setSku(inventoryDetails.getSku());
        inventory.setImageUrl(inventoryDetails.getImageUrl());
        inventory.setExpiry_date(inventoryDetails.getExpiry_date());
        inventory.setLast_stocked_date(inventoryDetails.getLast_stocked_date());
        inventory.setLast_updated(LocalDateTime.now());
        inventory.setStatus(inventoryDetails.getStatus());
        inventory.setSupplier_id(inventoryDetails.getSupplier_id());
        inventory.setCost_price(inventoryDetails.getCost_price());
        inventory.setSelling_price(inventoryDetails.getSelling_price());
        inventory.setCreatedAt(inventory.getCreatedAt()); // Keep original createdAt
        inventory.setUpdatedAt(LocalDateTime.now()); // Update updatedAt

        return inventoryRepository.save(inventory);
    }

    public void deleteInventory(Long id) {
        Inventory inventory = getInventoryById(id);
        inventoryRepository.delete(inventory);
    }
}
