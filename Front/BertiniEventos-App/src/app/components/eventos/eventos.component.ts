import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CollapseDirective, CollapseModule } from 'ngx-bootstrap/collapse';
import { Evento } from '../../models/Evento';
import { Lote } from '../../models/Lote';
import { Palestrante } from '../../models/Palestrante';
import { RedeSocial } from '../../models/RedeSocial';
import { EventoService } from '../../services/evento.service';
import { DateTimeFormatPipe } from '../../helpers/DateTimeFormat.pipe';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TituloComponent } from '../../shared/titulo/titulo.component';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    CommonModule,
    CollapseModule,
    FormsModule,
    DateTimeFormatPipe,
    ModalModule,
    NgxSpinnerModule,
    TituloComponent,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss'
})
export class EventosComponent implements OnInit {
  ngOnInit(): void {

  }

}
