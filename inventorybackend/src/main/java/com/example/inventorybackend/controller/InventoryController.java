package com.example.inventorybackend.controller;

import com.example.inventorybackend.model.Inventory;
import com.example.inventorybackend.service.InventoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping
    public List<Inventory> getAllInventories() {
        return inventoryService.getAllInventories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inventory> getInventoryById(@PathVariable(value = "id") Long inventoryId) {
        Inventory inventory = inventoryService.getInventoryById(inventoryId);
        return ResponseEntity.ok().body(inventory);
    }

    @PostMapping
    public ResponseEntity<Inventory> createInventory(@Valid @RequestBody Inventory inventory) {
        Inventory createdInventory = inventoryService.createInventory(inventory);
        return new ResponseEntity<>(createdInventory, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inventory> updateInventory(@PathVariable(value = "id") Long inventoryId,
                                                 @Valid @RequestBody Inventory inventoryDetails) {
        Inventory updatedInventory = inventoryService.updateInventory(inventoryId, inventoryDetails);
        return ResponseEntity.ok(updatedInventory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventory(@PathVariable(value = "id") Long inventoryId) {
        inventoryService.deleteInventory(inventoryId);
        return ResponseEntity.noContent().build();
    }
}
