import { Component, OnInit } from '@angular/core';
import { TituloComponent } from "@app/shared/titulo/titulo.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [TituloComponent]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
