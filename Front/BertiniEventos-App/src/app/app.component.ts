import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventosComponent}  from './eventos/eventos.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { HttpClientModule } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EventosComponent, PalestrantesComponent, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BertiniEventos-App';
}
