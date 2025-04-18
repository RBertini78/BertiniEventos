import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { CollapseDirective, CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule,CollapseModule,FormsModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss'
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltrados: any = [];
  public eventoSelecionado: any;
  widthImg: number = 150;
  marginImg: number = 2;
  showImg: boolean = true;
  private _filterList: string = '';

  public get filterList(): string {
    return this._filterList;
  }
  public set filterList(value: string) {
    this._filterList = value;
    this.eventosFiltrados = this.filterList ? this.filtrarEventos(this.filterList) : this.eventos;
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string; }) =>
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }
  // Replace 'any' with the appropriate type for your eventos
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos()
  }

  exibirImg() {
    this.showImg = !this.showImg;
  }

  public getEventos(): void {

    this.http.get('https://localhost:7251/api/eventos').subscribe(response =>{ this.eventos = response; this.eventosFiltrados = this.eventos}, error => console.error(error));

  }
  // Additional methods and properties can be added here

}
