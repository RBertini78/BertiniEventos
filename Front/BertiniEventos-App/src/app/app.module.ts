import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ContatosComponent } from "./components/contatos/contatos.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EventosComponent } from "./components/eventos/eventos.component";
import { EventoDetalheComponent } from "./components/eventos/evento-detalhe/evento-detalhe.component";
import { PalestrantesComponent } from "./components/palestrantes/palestrantes.component";
import { PalestranteListaComponent } from "./components/palestrantes/palestrante-lista/palestrante-lista.component";
import { PalestranteDetalheComponent } from "./components/palestrantes/palestrante-detalhe/palestrante-detalhe.component";
import { PerfilComponent } from "./components/user/perfil/perfil.component";
import { PerfilDetalheComponent } from "./components/user/perfil/perfil-detalhe/perfil-detalhe.component";
import { RedesSociaisComponent } from "./components/redesSociais/redesSociais.component";
import { NavComponent } from "./shared/nav/nav.component";
import { TituloComponent } from "./shared/titulo/titulo.component";
import { LoginComponent } from "./components/user/login/login.component";
import { RegistrationComponent } from "./components/user/registration/registration.component";
import { EventoListaComponent } from "./components/eventos/evento-lista/evento-lista.component";
import { HomeComponent } from "./components/home/home.component";
import { UserComponent } from "./components/user/user.component";

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { NgxCurrencyDirective } from 'ngx-currency';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { JwtInterceptor } from "./interceptors/jwt.interceptor";

import { EventoService } from "./services/evento.service";
import { LoteService } from "./services/lote.service";
import { AccountService } from "./services/account.service";
import { DateTimeFormatPipe } from "./helpers/DateTimeFormat.pipe";
import { AuthGuard } from "./guard/auth.guard";
import { PalestranteService } from "./services/palestrante.service";



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
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    TabsModule.forRoot(),
    NgxSpinnerModule,
    AppComponent,
    EventosComponent,
    PalestrantesComponent,
    PalestranteListaComponent,
    PalestranteDetalheComponent,
    ContatosComponent,
    DashboardComponent,
    PerfilComponent,
    PerfilDetalheComponent,
    RedesSociaisComponent,
    NavComponent,
    TituloComponent,
    EventoDetalheComponent,
    EventoListaComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  providers: [
    [AuthGuard],
    EventoService,
    LoteService,
    AccountService,
    PalestranteService,
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],

  //schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
