import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventosComponent}  from './components/eventos/eventos.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { NavComponent } from "./shared/nav/nav.component";
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ContatosComponent } from "./components/contatos/contatos.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PerfilComponent } from "./components/user/perfil/perfil.component";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AccountService } from './services/account.service';
import { User } from './models/identity/User';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavComponent,
    NgxSpinnerModule,
    ToastrModule,
    EventosComponent,
    PalestrantesComponent,
    ContatosComponent,
    DashboardComponent,
    PerfilComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public accountService: AccountService) {}

  ngOninit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    let user: User | null;

    if(localStorage.getItem('user')){
      user = JSON.parse(localStorage.getItem('user') ?? '{}');
    } else {
      user = null;
    }

    if (user)
      this.accountService.setCurrentUser(user);
  }
}
