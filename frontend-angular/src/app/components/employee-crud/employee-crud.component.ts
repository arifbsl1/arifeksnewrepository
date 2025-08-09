import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-crud',
  templateUrl: './employee-crud.component.html',
  styleUrls: ['./employee-crud.component.css']
})
export class EmployeeCrudComponent implements OnInit {
  employees: any[] = [];
  employee: any = {
    id: null,
    name: '',
    position: ''
  };

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  createEmployee(): void {
    this.employeeService.addEmployee(this.employee).subscribe(data => {
      this.getEmployees();
      this.resetForm();
    });
  }

  updateEmployee(): void {
    this.employeeService.updateEmployee(this.employee.id,this.employee).subscribe(data => {
      this.getEmployees();
      this.resetForm();
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(data => {
      this.getEmployees();
    });
  }

  editEmployee(employee: any): void {
    this.employee = { ...employee };
  }

  resetForm(): void {
    this.employee = {
      id: null,
      name: '',
      position: ''
    };
  }
}