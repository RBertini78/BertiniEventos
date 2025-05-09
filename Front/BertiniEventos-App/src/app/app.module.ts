import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import {AppRoutingModule} from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EventosComponent } from "./eventos/eventos.component";
import { PalestrantesComponent } from "./palestrantes/palestrantes.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavComponent } from './nav/nav.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';


@NgModule({
  declarations: [
    // AppComponent,
    // EventosComponent,
    // PalestrantesComponent,
    //   NavComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    FormsModule,
  ],
  providers: [],
  // Removed bootstrap array as AppComponent is a standalone component
})
export class AppModule {   }
