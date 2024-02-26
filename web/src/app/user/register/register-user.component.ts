import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { User } from '../types/user.type';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RegisterUserComponent implements OnInit {
  userRegistrationForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  maxDateOfBirth = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userRegistrationForm = this.formBuilder.group(
      {
        username: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [null, Validators.required],
        dob: [null, [Validators.required]]
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (!confirmPassword) return null;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.userRegistrationForm.valid) {
      // Handle form submission
      const { username, email, password, confirmPassword, dob } =
        this.userRegistrationForm.value;
      const newUser: User = {
        username: username,
        email: email,
        dob: dob,
        password: password,
        confirmPassword: confirmPassword,
      };
      this.userService.createUser(newUser).subscribe(user => {
        console.log(user, 'user added')
        this.toastr.success('User Registered Successfully');
        this.userRegistrationForm.reset();

        // Remove errors appearing after reset of the form
        this.userRegistrationForm.controls['username'].setErrors(null);
        this.userRegistrationForm.controls['email'].setErrors(null);
        this.userRegistrationForm.controls['dob'].setErrors(null);
        this.userRegistrationForm.controls['password'].setErrors(null);
        this.userRegistrationForm.controls['confirmPassword'].setErrors(null);
      });
    }
  }

  togglePasswordVisibility(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}
