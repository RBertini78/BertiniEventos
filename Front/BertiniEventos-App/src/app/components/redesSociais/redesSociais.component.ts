import { Component, Input, input, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RedeSocial } from '@app/models/RedeSocial';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { RedeSocialService } from '@app/services/redeSocial.service';



@Component({
  selector: 'app-redesSociais',
  templateUrl: './redesSociais.component.html',
  styleUrls: ['./redesSociais.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class RedesSociaisComponent implements OnInit {

  modalRef!: BsModalRef;
  @Input() eventoId = 0;
  public formRS!: FormGroup;
  public redeSocialAtual = {id: 0, nome: '', indice: 0};

  public get redesSociais(): FormArray {
    return this.formRS.get('redesSociais') as FormArray;
  }


  constructor(
    private fb: FormBuilder,
    private modalService : BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private redeSocialService: RedeSocialService
  ) { }

  ngOnInit() {
    this.carregarRedeSocial(this.eventoId);
    this.validation();
  }

  private carregarRedeSocial(id: number = 0): void{
    let origem = 'palestrante';

    if (this.eventoId !== 0){
      origem = 'evento';
    }
    this.spinner.show();
    this.redeSocialService.getRedesSociais(origem.toLowerCase(), id)
    .subscribe(
      (redesSociaisRetorno: RedeSocial[]) => {
        redesSociaisRetorno.forEach((redeSocial) => {
          this.redesSociais.push(this.criarRedeSocial(redeSocial));
        });
      },
      (error: any) => {
        this.toastr.error('Erro ao carregar as redes sociais.', 'Erro!');
        console.error(error);
      }
    ).add(() => this.spinner.hide());
  }

  public validation(): void{
    this.formRS = this.fb.group({
      redesSociais: this.fb.array([])
    })
  }

  adicionarRedeSocial(): void{
    this.redesSociais.push(this.criarRedeSocial({id:0} as RedeSocial));

}
  criarRedeSocial(redeSocial: RedeSocial): FormGroup{
    return this.fb.group({
      id: [redeSocial.id],
      nome: [redeSocial.nome, Validators.required],
      url: [redeSocial.url, Validators.required],
    });
  }

  public retornaTitulo(nome: string): string{
    return nome === null || nome === '' ? 'Rede Social' : nome;
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any{
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public saveRedesSociais(): void{
    let origem = 'palestrante';

    if (this.eventoId !== 0){
      origem = 'evento';
    }

    if (this.formRS.controls['redesSociais'].valid){
      this.spinner.show();
      this.redeSocialService.saveRedesSociais(origem, this.eventoId, this.formRS.value.redesSociais)
      .subscribe(
        () => {
          this.toastr.success('Redes sociais salvas com sucesso.', 'Sucesso!');
        },
        (error: any) => {
          console.error(error);
          this.toastr.error('Erro ao salvar as redes sociais.', 'Erro!');
        }
      ).add(() => this.spinner.hide());
    }
  }

  public deleteRedeSocial(template: TemplateRef<any>, indice: number): void{
  this.redeSocialAtual.id = this.redesSociais.get(indice + '.id')?.value;
  this.redeSocialAtual.nome = this.redesSociais.get(indice + '.nome')?.value;
  this.redeSocialAtual.indice = indice;
  this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
}

confirmDeleteRedeSocial(): void{

  let origem = 'palestrante';

  this.modalRef.hide();
  this.spinner.show();

  if (this.eventoId !== 0){
    origem = 'evento';
  }

  this.redeSocialService.deleteRedeSocial(origem, this.eventoId, this.redeSocialAtual.id)
  .subscribe(
    () => {
      this.toastr.success('Rede social deletada com sucesso.', 'Sucesso!');
      this.redesSociais.removeAt(this.redeSocialAtual.indice);
    },
    (error: any) => {
      console.error(error);
      this.toastr.error(`Erro ao remover a rede social ${this.redeSocialAtual.nome}.`, 'Erro!');
    }
  ).add(() => this.spinner.hide());

}

declineDeleteRedeSocial(): void{
  this.modalRef.hide();
}

}
