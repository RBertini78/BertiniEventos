import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { UserUpdate } from '@app/models/identity/UserUpdate';
import { AccountService } from '@app/services/account.service';
import { PalestranteService } from '@app/services/palestrante.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-perfil-detalhe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil-detalhe.component.html',
  styleUrls: ['./perfil-detalhe.component.css']
})
export class PerfilDetalheComponent implements OnInit {
  @Output() changeFormValue = new EventEmitter();


  userUpdate = {} as UserUpdate;
  form!: FormGroup;

  constructor(
    private fb:FormBuilder,
    public accountService: AccountService,
    public palestranteService: PalestranteService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.validation();
    this.carregarUsuario();
    this.verificaForm();
  }

  private verificaForm(): void {
    this.form.valueChanges.subscribe(() => {
      this.changeFormValue.emit({... this.form.value});
    });
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
      imagemURL: [''],
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

  get f(): any { return this.form.controls; }

  onSubmit(): void {
    this.atualizarUsuario();
  }

  public atualizarUsuario(): void {
    this.userUpdate = { ...this.form.value };
    this.spinner.show();

    if(this.f?.function?.value === 'palestrante'){
      this.palestranteService.post().subscribe(
        () => this.toastr.success('Função palestrante ativada para o usuário!', 'Sucesso!'),
        (error) => {
          this.toastr.error('Erro ao atribuir papel de Palestrante', 'Erro!');
          console.error(error);
        }
      );
    }

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
