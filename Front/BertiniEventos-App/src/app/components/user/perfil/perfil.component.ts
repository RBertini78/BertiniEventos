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

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  userUpdate = {} as UserUpdate;
  form!: FormGroup;


  constructor(
    private fb:FormBuilder,
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  get f(): any { return this.form.controls; }

  ngOnInit() {
    this.validation();
    this.carregarUsuario();
  }

  private carregarUsuario(): void {
    this.spinner.show();
    this.accountService.getUser().subscribe(
      (userRetorno: UserUpdate) => {
        console.log(userRetorno);
        this.userUpdate = userRetorno;
        this.form.patchValue(this.userUpdate);
        this.toastr.success('Usuário carregado com sucesso', 'Sucesso!');
      },
      (error) => {
        console.error(error);
        this.toastr.error('Erro ao carregar usuário', 'Erro!');
        this.router.navigate(['/dashboard']);
      }
    ).add(() => this.spinner.hide());
  }

  private validation() {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmPassword')
    };

    this.form = this.fb.group({
      userName: [''],
      title: ['NaoInformado',Validators.required] ,
      firstName: ['',Validators.required],
      lastName:['',Validators.required],
      email: ['',Validators.required],
      phoneNumber: ['',Validators.required],
      function: ['NaoInformado',Validators.required],
      description: ['',Validators.required],
      password: ['',[Validators.nullValidator, Validators.minLength(4)]],
      confirmPassword: ['',Validators.required],
    }, formOptions);

  }

  onSubmit(): void {
    this.atualizarUsuario();
  }

  public atualizarUsuario(): void {
    console.log(this.form.value);
    this.userUpdate = { ...this.form.value };
    this.spinner.show();
    this.accountService.updateUser(this.userUpdate).subscribe(
      () => {
        this.toastr.success('Usuário atualizado com sucesso', 'Sucesso!');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error(error);
        this.toastr.error(error.error);
      }
    ).add(() => this.spinner.hide());
  }

  //event passado como parâmetro para evitar postback e realizar somente o form reset
  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

}
