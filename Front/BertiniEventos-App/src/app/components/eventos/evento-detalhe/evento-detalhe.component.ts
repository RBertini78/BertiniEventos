import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormGroup, FormsModule, FormControl, ReactiveFormsModule, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxCurrencyDirective } from 'ngx-currency';

import { EventoService } from '@app/services/evento.service';
import { AccountService } from '@app/services/account.service';
import { LoteService } from '@app/services/lote.service';
import { DateTimeFormatPipe } from '@app/helpers/DateTimeFormat.pipe';
import { Evento } from '@app/models/Evento';
import { Lote } from '@app/models/Lote';
import { environment } from 'src/environments/environment';
import e from 'express';
import { first } from 'rxjs';
import { RedesSociaisComponent } from "@app/components/redesSociais/redesSociais.component";


defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-evento-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    NgxCurrencyDirective,
    ToastrModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    DateTimeFormatPipe,
    TooltipModule,
    RedesSociaisComponent
],
  templateUrl: './evento-detalhe.component.html',
  styleUrl: './evento-detalhe.component.scss',
  providers: [DatePipe],
})
export class EventoDetalheComponent implements OnInit {
  modalRef!: BsModalRef;
  eventoId!: number;
  evento = {} as Evento;
  form: FormGroup = new FormGroup({});
  estadoSalvar = 'post';
  loteAtual = {id: 0, nome: '', indice: 0};
  imagemURL = 'assets/upload.png';
  file!: File;
enviroment: any;

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      adaptivePosition: true,
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }

  get modoEditar(): boolean {
    return this.estadoSalvar === 'put';
  }

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private activatedRouter: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private router: Router,
    private loteService: LoteService, // Assuming LoteService is similar to EventoService
    private datePipe: DatePipe,
    private accountService: AccountService
  ) {
    this.localeService.use('pt-br');
  }

  public carregarEvento(): void {
    this.eventoId = +this.activatedRouter.snapshot.paramMap.get('id')!;

    if(this.eventoId !== null && this.eventoId !== 0) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService.getEventosById(+this.eventoId).subscribe({
        next: (evento: Evento) => {
          this.evento = {... evento};
          this.form.patchValue(this.evento);
          if(this.evento.imagemURL !== '') {
            this.imagemURL =  environment.apiURL + 'resources/images/' + this.evento.imagemURL;
            this.form.patchValue({ imagemURL: this.evento.imagemURL });
          }
          this.carregarLotes();
        },
        error: (error: any) => {
          this.toastr.error('Erro ao carregar Evento.', 'Erro!');
          console.error(error);
        },

      }).add(() => this.spinner.hide());
    }
  }

  public carregarLotes(): void {
    this.loteService.getLotesByEventoId(this.eventoId).subscribe({
      next: (lotesRetorno: Lote[]) => {
        lotesRetorno.forEach((lote)  => {
          this.lotes.push(this.criarLote(lote));
        });
      },
      error: (error: any) => {
        if (error.status === 404) {
          this.toastr.warning('Nenhum lote encontrado.', 'Aviso!');
        } else {
        this.toastr.error('Erro ao carregar Lotes.', 'Erro!');
        console.error(error);
      }
    }
    });
  }

  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      local: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      dataEvento: ['', [Validators.required]],
      qtdPessoas: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100000)],
      ],
      telefone: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(15),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: [''],
      lotes: this.fb.array([])
    });
  }

  public adicionarLote(): void {
    this.lotes.push(this.criarLote({ id:0 } as Lote));
  }

  public criarLote(lote: Lote): FormGroup {
    return this.fb.group({
        id: [lote.id],
        nome: [lote.nome, [Validators.required, Validators.minLength(4), Validators.maxLength(50 )]],
        quantidade: [lote.quantidade, [Validators.required, Validators.min(1), Validators.max(10000)]],
        preco: [lote.preco, [Validators.required, Validators.min(0.01), Validators.max(100000)]],
        dataInicio: [lote.dataInicio],
        dataFim: [lote.dataFim],
      });
  }

  public mudarValorData(value: Date, indice: number, campo: string): void {
    this.lotes.value[indice][campo] = value;
  }

  public retornaTituloLote(nome: string): string {
    return nome === null || nome === '' ? 'Novo Lote' : nome;
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public salvarEvento(): void {
    this.spinner.show();
    if(this.form.valid){
      const eventoData = {
        ... this.form.value,
          palestrantes: [],
          redesSociais: [],
          lotes: this.form.value.lotes ?? [],
          lote:'',
          imagemURL: typeof this.form.value.imagemURL === 'string' && this.form.value.imagemURL.startsWith('data:')
        ? ''
        : this.form.value.imagemURL,
        userDto: {
          userName: this.accountService.currentUserValue?.userName ?? '',
          email: this.accountService.currentUserValue?.email ?? '',
          firstName: this.accountService.currentUserValue?.firstName ?? '',
          lastName: this.accountService.currentUserValue?.lastName ?? '',
          password: ''
        }
      };

      this.evento = (this.estadoSalvar === 'post')
        ? eventoData
        : {id: this.evento.id, ...eventoData};

      this.eventoService[this.estadoSalvar](this.evento).subscribe(
         (eventoRetorno: Evento) => {
          this.toastr.success('Evento salvo com sucesso!', 'Sucesso!');
          this.router.navigate([`/eventos/detalhe/${eventoRetorno.id}`]);
        },
         (error: any) => {
          console.error('Erro completo',error);
if (error.status === 400 && error.error?.errors) {
    const validationErrors = error.error.errors;
    for (const field in validationErrors) {
      if (validationErrors.hasOwnProperty(field)) {
        this.toastr.error(validationErrors[field].join(' '), `Erro no campo: ${field}`);
      }
    }
  } else {
    this.toastr.error('Erro ao salvar evento!', 'Erro!');
  }


          // this.spinner.hide();
          // this.toastr.error('Erro ao salvar evento!', 'Erro!');
        },
        () => this.spinner.hide()
      );
    }
  }

  public salvarLotes(): void {
    if(this.form.controls['lotes'].valid) {

      this.spinner.show();
      this.loteService.saveLote(this.eventoId, this.form.value.lotes).subscribe({
        next: () => {
          this.toastr.success('Lote salvo com sucesso!', 'Sucesso!');
          this.lotes.reset();
          this.router.navigate([`/eventos/detalhe/${this.eventoId}`]);
        },
        error: (error: any) => {
          console.error(error);
          this.toastr.error('Erro ao salvar lote!', 'Erro!');
        }

      }).add(() => this.spinner.hide());
    }
    //this.carregarEvento();
  }

  public excluirLote(template:TemplateRef<any>,indice: number): void {

    this.loteAtual.id = this.lotes.get(indice + '.id')?.value;
    this.loteAtual.nome = this.lotes.get(indice + '.nome')?.value;
    this.loteAtual.indice = indice;

    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.lotes.removeAt(indice);
    this.toastr.success('Lote excluído com sucesso!', 'Sucesso!');
  }

  public confirmExcluirLote(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.loteService.deleteLote(this.eventoId, this.loteAtual.id).subscribe(
      () => {
        this.toastr.success('Lote excluído com sucesso!', 'Sucesso!');
        this.lotes.removeAt(this.loteAtual.indice);
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(`Erro ao tentar excluir o lote ${this.loteAtual.id}`, 'Erro!');
      },
    ).add(() => this.spinner.hide());
  }


  public declineExcluirLote(): void {
    this.modalRef.hide();
  }

  onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => this.imagemURL = event.target.result;

    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0]);

    this.uploadImagem();
  }


 uploadImagem(): void {
    this.spinner.show();
    this.eventoService.postUpload(this.eventoId, this.file).subscribe({
      next: () => {
        this.carregarEvento();
        this.toastr.success('Imagem do evento atualizada com sucesso!', 'Sucesso!');
      },
      error: (error: any) => {
        this.toastr.error('Erro ao tentar atualizar a imagem do evento', 'Erro!');
        console.log(error);
      }
    }).add(() => this.spinner.hide());
  }

}
