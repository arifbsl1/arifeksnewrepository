import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId: number | null = null;
  roles: string[] = ['ADMIN', 'SUPERVISOR', 'ENGINEER', 'USER'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: [''], // Password is not required for editing
      role: [this.roles[0], Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = +params['id'];
        // For edit mode, password is not required
        this.userForm.get('password')?.clearValidators();
        this.userService.getUser(this.userId).subscribe(data => {
          this.userForm.patchValue(data);
        });
      } else {
        // For new user mode, password is required
        this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(8)]);
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const userData: User = this.userForm.value;

    if (this.isEditMode && this.userId) {
      this.userService.updateUser(this.userId, userData).subscribe(() => {
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.createUser(userData).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}
