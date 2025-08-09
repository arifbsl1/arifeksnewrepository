import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css']
})

export class InventoryFormComponent implements OnInit {
  inventoryForm: FormGroup;
  isEditMode = false;
  inventoryId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.inventoryForm = this.fb.group({
      productId: ['', Validators.required],
      productname: ['', Validators.required],
      sku: ['', Validators.required],
      quantity_available: [0, Validators.required],
      quantity_reserved: [0, Validators.required],
      reorder_level: [0, Validators.required],
      location: ['', Validators.required],
      batch_number: [''],
      quantityInStock: [0],
      category: [''],
      brand: [''],
      imageUrl: [''],
      expiry_date: [null],
      last_stocked_date: [null],
      last_updated: [null],
      status: [''],
      supplier_id: [null],
      cost_price: [0],
      selling_price: [0]
    });
  }

  ngOnInit(): void {
    this.inventoryId = this.route.snapshot.params['id'];
    if (this.inventoryId) {
      this.isEditMode = true;
      this.inventoryService.getInventoryById(this.inventoryId).subscribe(data => {
        this.inventoryForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      if (this.isEditMode && this.inventoryId) {
        this.inventoryService.updateInventory(this.inventoryId, this.inventoryForm.value).subscribe(() => {
          this.router.navigate(['/inventory']);
        });
      } else {
        this.inventoryService.createInventory(this.inventoryForm.value).subscribe(() => {
          this.router.navigate(['/inventory']);
        });
      }
    }
  }
}
