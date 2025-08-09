import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  editOrder(id: number): void {
    this.router.navigate(['/orders/edit', id]);
  }

  deleteOrder(id: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(id).subscribe(() => {
        this.loadOrders();
      });
    }
  }

  addOrder(): void {
    this.router.navigate(['/orders/new']);
  }
}
