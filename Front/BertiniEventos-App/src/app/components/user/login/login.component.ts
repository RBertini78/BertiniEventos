import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserLogin } from '@app/models/identity/UserLogin';
import { AccountService } from '@app/services/account.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '@app/models/identity/User';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
model = {} as UserLogin;
  constructor(private accountService: AccountService,
    private router: Router,
    private toaster: ToastrService) { }

    ngOnInit(): void {}

    public login(): void {
      this.accountService.login(this.model).subscribe({
        next: (user: User) => {
          this.accountService.setCurrentUser(user);
          this.router.navigateByUrl('/dashboard');
          this.toaster.success('Login realizado com sucesso!');
        },
        error: (error: any) => {
          if (error.status === 401)
            this.toaster.error('Usuário ou senha inválidos.');
          else
            console.error(error);

      }});
    }
}

