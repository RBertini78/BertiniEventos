import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { User } from '@app/models/identity/User';
import { AccountService } from '@app/services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  user = {} as User;
  form!: FormGroup;

  constructor(private fb:FormBuilder,
              private accountService: AccountService,
              private router: Router,
              private toastr: ToastrService) {}

  get f(): any { return this.form.controls; }

  ngOnInit(): void {
    this.validation();
  }

  private validation() {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmPassword')
    };

    this.form = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      userName: ['',Validators.required],
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',Validators.required],
    }, formOptions);
  }

  register(): void {
    this.user = { ... this.form.value };
    console.log(this.user);
    this.accountService.register(this.user).subscribe(
      () =>  this.router.navigateByUrl('/dashboard'),
      (error: any) => {
        console.error(error);
        const msg= error?.error?.message ?? error?.error ?? error?.message ?? 'Erro ao registrar usuário.';
        this.toastr.error(typeof msg === 'string' ? msg : JSON.stringify(msg));
      }
    )
}

}
