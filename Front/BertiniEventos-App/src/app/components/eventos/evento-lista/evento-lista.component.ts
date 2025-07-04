import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { DateTimeFormatPipe } from '../../../helpers/DateTimeFormat.pipe';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@Component({
  selector: 'app-evento-lista',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ModalModule,
    NgxSpinnerModule,
    ToastrModule,
    DateTimeFormatPipe,
    CollapseModule,
  ],
  templateUrl: './evento-lista.component.html',
  styleUrl: './evento-lista.component.scss',
})
export class EventoListaComponent {
  modalRef?: BsModalRef;

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public eventoId = 0;

  public widthImg: number = 150;
  public marginImg: number = 2;
  public showImg: boolean = true;
  private _filterList: string = '';

  public get filterList(): string {
    return this._filterList;
  }
  public set filterList(value: string) {
    this._filterList = value;
    this.eventosFiltrados = this.filterList
      ? this.filtrarEventos(this.filterList)
      : this.eventos;
  }

  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string }) =>
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }
  // Replace 'any' with the appropriate type for your eventos
  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.toastr.clear();
    this.spinner.show('spinner', {
      type: 'ball-spin',
      size: 'medium',
      bdColor: 'rgba(0,0,0,0.8)',
      color: '#fff',
      fullScreen: true,
      zIndex: 9999,
    });
    this.getEventos();
  }

  public exibirImg(): void {
    this.showImg = !this.showImg;
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos;
      },
      error: (error: any) => {
        this.spinner.hide('spinner');
        this.toastr.error('Erro ao Carregar os eventos', 'Erro!');
      },
      complete: () => this.spinner.hide('spinner'),
    });
  }

  openModal(event: any, template: TemplateRef<void>, eventoId: number) {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.eventoService.deleteEvento(this.eventoId).subscribe(
      (result: any) => {
        if(result.message ==='Deletado'){
          this.toastr.success(
            'O evento foi deletado com sucesso!',
            'Deletado!'
          );
        this.spinner.hide();
        this.getEventos();
      }
      },
      (error: any) => {
        this.toastr.error(
          `Erro ao tentar deletar o evento ${this.eventoId}`,
          'Erro!'
        );
        this.spinner.hide();
        console.error(error);
      },
      () => this.spinner.hide()
    );
  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheEvento(id: number): void {
    this.router.navigate([`/eventos/detalhe/${id}`]);
  }
}
