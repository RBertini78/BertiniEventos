import { Component } from '@angular/core';
import { TituloComponent } from "../../shared/titulo/titulo.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-palestrantes',
  standalone: true,
  imports: [CommonModule, TituloComponent],
  templateUrl: './palestrantes.component.html',
  styleUrls: ['./palestrantes.component.scss']
})
export class PalestrantesComponent {

  constructor() { }
}
