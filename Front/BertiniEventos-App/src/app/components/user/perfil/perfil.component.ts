import { Component, OnInit } from '@angular/core';
import { TituloComponent } from "../../../shared/titulo/titulo.component";
import { CommonModule } from '@angular/common';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { AccountService } from '@app/services/account.service';
import {ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserUpdate } from '@app/models/identity/UserUpdate';
import { TabsModule } from "ngx-bootstrap/tabs";
import { PerfilDetalheComponent } from "./perfil-detalhe/perfil-detalhe.component";
import { environment } from '@environment/environment';
import { PalestranteDetalheComponent } from "@app/components/palestrantes/palestrante-detalhe/palestrante-detalhe.component";
import { RedesSociaisComponent } from "@app/components/redesSociais/redesSociais.component";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, TabsModule, PerfilDetalheComponent, PalestranteDetalheComponent, RedesSociaisComponent],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public usuario = {} as UserUpdate;
  public file!: File;
  public imagemURL = '';

  public get ehPalestrante(): boolean {
    return this.usuario.function === 'Palestrante';
  }

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private accountService: AccountService) { }

  public setFormValue(usuario: UserUpdate): void {
    this.usuario = usuario;
    if(this.usuario)
      this.imagemURL = environment.apiURL + `resources/perfil/${this.usuario.imagemURL}`;
    else
      this.imagemURL = './assets/img/semfoto.png';
  }


  ngOnInit() {

  }

onFileChange(event: any): void {
  const reader = new FileReader();

  reader.onload = (event:any) => this.imagemURL = event.target.result;

  this.file = event.target.files;
  reader.readAsDataURL(this.file[0]);

  this.uploadImage();
}

private uploadImage(): void {
  this.spinner.show();

  this.accountService.postUpload(this.file).subscribe(
    () => {
      this.toastr.success('Imagem atualizada com sucesso.', 'Sucesso!');
    },
    (error: any) => {
      this.toastr.error('Erro ao fazer upload de imagem.', 'Erro!');
      console.error(error);
    }
  ).add(() => this.spinner.hide());
}

}
