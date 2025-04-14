import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss'
})
export class EventosComponent implements OnInit {

  public eventos: any;
  // Replace 'any' with the appropriate type for your eventos
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos()
  }

  public getEventos(): void {

    this.http.get('https://localhost:7251/api/eventos').subscribe(response => this.eventos = response, error => console.error(error));

  }
  // Additional methods and properties can be added here

}
