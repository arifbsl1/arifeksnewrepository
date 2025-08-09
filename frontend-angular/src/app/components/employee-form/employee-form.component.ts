import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode = false;
  employeeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // FIX: Initialize the form with the correct fields: 'name' and 'department'
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      salary: ['', [Validators.required, Validators.min(0)]]
 
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.employeeId = +params['id'];
        this.employeeService.getEmployee(this.employeeId).subscribe(data => {
          // This will now correctly patch the 'name' and 'department' fields
          this.employeeForm.patchValue(data);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      return;
    }

    const employeeData: Employee = this.employeeForm.value;

    if (this.isEditMode && this.employeeId) {
      this.employeeService.updateEmployee(this.employeeId, employeeData).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    } else {
      this.employeeService.addEmployee(employeeData).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }
}