import { Component, OnInit } from '@angular/core';
import { TituloComponent } from "../../shared/titulo/titulo.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contatos',
  standalone: true,
  imports: [CommonModule, TituloComponent],
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
