import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = `http://localhost:8083/api/inventory`;
  constructor(private http: HttpClient) { }

  getAllInventories(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiUrl);
  }

  getInventoryById(id: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.apiUrl}/${id}`);
  }

  createInventory(inventory: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(this.apiUrl, inventory);
  }

  updateInventory(id: number, inventory: Inventory): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.apiUrl}/${id}`, inventory);
  }

  deleteInventory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
