import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.html',
  styleUrls: ['./auth.css'],
  imports: [ReactiveFormsModule],
})
export class Auth {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  http = inject(HttpClient);
  mode: 'login' | 'register' = 'login';
  loginForm: FormGroup;
  registerForm: FormGroup;

  setFragment(fragment: string) {
    this.router.navigate(this.route.snapshot.url, {
      fragment: fragment,
    });
  }

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );
  }

  private passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.http
        .post('/api/auth/login', this.loginForm.value)
        .subscribe((result) => {
          console.log(result);
        });
      // Call API to login
      console.log(this.loginForm.value);
    } else {
      console.log('Invalid form');
    }
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      // Call API to register
      console.log(this.registerForm.value);
      fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(this.registerForm.value),
      });
    } else {
      console.log('Invalid form');
    }
  }
}
