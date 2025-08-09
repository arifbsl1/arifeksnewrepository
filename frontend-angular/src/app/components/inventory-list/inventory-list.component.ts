import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../models//inventory.model';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {
  inventories: Inventory[] = [];

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.loadInventories();
  }

  loadInventories(): void {
    this.inventoryService.getAllInventories().subscribe(data => {
      this.inventories = data;
    });
  }

  deleteInventory(id: number): void {
    this.inventoryService.deleteInventory(id).subscribe(() => {
      this.loadInventories();
    });
  }
}
