import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {
  
  @Input() titulo!: string;
  @Input() iconClass = 'fa fa-user';
  @Input() subtitulo = 'Desde 2025';
  @Input() botaoListar = false;

  constructor(private router: Router) { }

  ngOnInit() { }

  listar(): void {
    this.router.navigate([`/${this.titulo.toLowerCase()}/lista`]);
  }
}
