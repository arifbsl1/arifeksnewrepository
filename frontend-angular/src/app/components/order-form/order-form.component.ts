import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  isEditMode = false;
  orderId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      productName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];
    if (this.orderId) {
      this.isEditMode = true;
      this.orderService.getOrder(this.orderId).subscribe(data => {
        this.orderForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.orderForm.invalid) {
      return;
    }

    const orderData: Order = this.orderForm.value;

    if (this.isEditMode && this.orderId) {
      this.orderService.updateOrder(this.orderId, orderData).subscribe(() => {
        this.router.navigate(['/orders']);
      });
    } else {
      this.orderService.createOrder(orderData).subscribe(() => {
        this.router.navigate(['/orders']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/orders']);
  }
}
