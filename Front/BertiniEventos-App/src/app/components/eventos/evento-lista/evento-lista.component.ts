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
import { environment } from '@environment/environment';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginatedResult, Pagination } from '@app/models/Pagination';
import { debounceTime, Subject } from 'rxjs';

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
    PaginationModule,
  ],
  templateUrl: './evento-lista.component.html',
  styleUrl: './evento-lista.component.scss',
})
export class EventoListaComponent {
  modalRef?: BsModalRef;

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public eventoId = 0;
  public pagination = {} as Pagination;

  public widthImg: number = 150;
  public marginImg: number = 2;
  public showImg: boolean = true;
  environment: any;

  searchTermChanged: Subject<string> = new Subject<string>();

  public filtrarEventos(event: any): void {
    if (this.searchTermChanged.observers.length === 0) {
      this.searchTermChanged.pipe(debounceTime(1000)).subscribe((filterBy) => {
        this.spinner.show();
        this.eventoService
          .getEventos(
            this.pagination.currentPage,
            this.pagination.itemsPerPage,
            filterBy
          )
          .subscribe({
            next: (response: PaginatedResult<Evento[]>) => {
              this.eventos = response.result;
              this.pagination = response.pagination as Pagination;
            },
            error: (error: any) => {
              this.spinner.hide('spinner');
              this.toastr.error('Erro ao Carregar os eventos', 'Erro!');
            },
          })
          .add(() => this.spinner.hide('spinner'))
      }
    )
  }
  this.searchTermChanged.next(event.value);
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
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 1,
    } as Pagination;
    this.toastr.clear();
    this.getEventos();
  }

  public exibirImg(): void {
    this.showImg = !this.showImg;
  }

  public mostraImagem(imagemURL: string): string {
    return imagemURL !== ''
      ? `${environment.apiURL}resources/images/${imagemURL}`
      : 'assets/sem_imagem.png';
  }

  public getEventos(): void {
    this.spinner.show('spinner', {
      type: 'ball-spin',
      size: 'medium',
      bdColor: 'rgba(0,0,0,0.8)',
      color: '#fff',
      fullScreen: true,
      zIndex: 9999,
    });
    this.eventoService
      .getEventos(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe({
        next: (response: PaginatedResult<Evento[]>) => {
          this.eventos = response.result;
          this.pagination = response.pagination as Pagination;
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

  public pageChanged(event): void {
    this.pagination.currentPage = event.page;
    this.getEventos();
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.eventoService.deleteEvento(this.eventoId).subscribe(
      (result: any) => {
        this.toastr.success('O evento foi deletado com sucesso!', 'Deletado!');
        this.spinner.hide();
        this.getEventos();
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
