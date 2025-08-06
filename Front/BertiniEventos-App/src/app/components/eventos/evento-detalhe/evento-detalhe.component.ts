import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, FormControl, ReactiveFormsModule, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { EventoService } from '@app/services/evento.service';
import { Evento } from '@app/models/Evento';
import { DateTimeFormatPipe } from '@app/helpers/DateTimeFormat.pipe';
import { Lote } from '@app/models/Lote';


defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-evento-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxSpinnerModule,
    ToastrModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    DateTimeFormatPipe,
    TooltipModule,
  ],
  templateUrl: './evento-detalhe.component.html',
  styleUrl: './evento-detalhe.component.scss',
})
export class EventoDetalheComponent implements OnInit {
  evento = {} as Evento;
  form: FormGroup = new FormGroup({});
  estadoSalvar = 'post';

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

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.localeService.use('pt-br');
  }

  public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if(eventoIdParam !== null) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService.getEventosById(+eventoIdParam).subscribe({
        next: (evento: Evento) => {
          this.evento = {... evento};
          this.form.patchValue(this.evento);
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao carregar Evento.', 'Erro!');
          console.error(error);
        },
        complete: () => this.spinner.hide(),
      });
    }
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
      imagemURL: ['', Validators.required],
      lotes: this.fb.array([])
    });
  }

  adicionarLote(): void {
    this.lotes.push(this.criarLote({id:0} as Lote));
  }

  criarLote(lote: Lote): FormGroup {
    return this.fb.group({
        id: [lote.id],
        nome: [lote.nome, Validators.required, Validators.minLength(4), Validators.maxLength(50 )],
        quantidade: [lote.quantidade, [Validators.required, Validators.min(1), Validators.max(10000)]],
        preco: [lote.preco, [Validators.required, Validators.min(0.01), Validators.max(100000)]],
        dataInicio: [lote.dataInicio],
        dataFim: [lote.dataFim]
      });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(field: FormControl): any {
    return {'is-invalid': field.errors && field.touched};
  }

  public salvarAlteracao(): void {
    this.spinner.show();
    if(this.form.valid){

      const eventoData = {
        ...this.form.value,
        lote: '', // String vazia conforme EventoDto
        lotes: [], // Array vazio conforme EventoDto
        palestrantes: [], // Array vazio conforme EventoDto
        redesSociais: [] // Array vazio conforme EventoDto
      };

      this.evento = (this.estadoSalvar === 'post')
        ? eventoData
        : {id: this.evento.id, ...eventoData};

      this.eventoService[this.estadoSalvar](this.evento).subscribe(
         () => this.toastr.success('Evento salvo com sucesso!', 'Sucesso!'),
         (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Erro ao salvar evento!', 'Erro!');
        },
        () => this.spinner.hide()
      );
    }
  }


}
