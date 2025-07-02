import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ContatosComponent } from "./components/contatos/contatos.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EventosComponent } from "./components/eventos/eventos.component";
import { PalestrantesComponent } from "./components/palestrantes/palestrantes.component";
import { PerfilComponent } from "./components/user/perfil/perfil.component";
import {NavComponent} from "./shared/nav/nav.component";
import {TituloComponent} from "./shared/titulo/titulo.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { EventoService } from "./services/evento.service";
import { DateTimeFormatPipe } from "./helpers/DateTimeFormat.pipe";

defineLocale('pt-br', ptBrLocale);
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DateTimeFormatPipe,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    NgxSpinnerModule,
    TituloComponent,
    NavComponent,
    ContatosComponent,
    DashboardComponent,
    EventosComponent,
    PalestrantesComponent,
    PerfilComponent
  ],
  providers: [EventoService, provideHttpClient()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
