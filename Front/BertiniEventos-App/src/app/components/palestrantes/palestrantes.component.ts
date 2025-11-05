import { Component } from '@angular/core';
import { TituloComponent } from "../../shared/titulo/titulo.component";
import { CommonModule } from '@angular/common';
import { PalestranteListaComponent } from "./palestrante-lista/palestrante-lista.component";

@Component({
  selector: 'app-palestrantes',
  standalone: true,
  imports: [CommonModule, TituloComponent, PalestranteListaComponent],
  templateUrl: './palestrantes.component.html',
  styleUrls: ['./palestrantes.component.scss']
})
export class PalestrantesComponent {

  constructor() { }
}
