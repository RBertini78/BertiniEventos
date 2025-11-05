import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResult, Pagination } from '@app/models/Pagination';
import { Palestrante } from '@app/models/Palestrante';
import { PalestranteService } from '@app/services/palestrante.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { environment } from '@environment/environment';

@Component({
  selector: 'app-palestrante-lista',
  templateUrl: './palestrante-lista.component.html',
  styleUrls: ['./palestrante-lista.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class PalestranteListaComponent implements OnInit {
  public Palestrantes: Palestrante[] = [];
  public eventoId = 0;
  public pagination = {} as Pagination;

  constructor(
    private palestranteService: PalestranteService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 1,
  } as Pagination;
    this.carregarPalestrantes();
  }
  searchTermChanged: Subject<string> = new Subject<string>();

   public filtrarPalestrantes(event: any): void {
      if (this.searchTermChanged.observers.length === 0) {
        this.searchTermChanged.pipe(debounceTime(1000)).subscribe((filterBy) => {
          this.spinner.show();
          this.palestranteService
            .getPalestrantes(
              this.pagination.currentPage,
              this.pagination.itemsPerPage,
              filterBy
            )
            .subscribe({
              next: (response: PaginatedResult<Palestrante[]>) => {
                this.Palestrantes = response.result;
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

    public getImagemUrl(imagemName: string): string {
      if(imagemName)
      return environment.apiURL + `resources/perfil/${imagemName}`;
    else
      return 'assets/img/semImagem.png';
    }

    public carregarPalestrantes(): void {
      this.spinner.show();
      this.palestranteService
        .getPalestrantes(
          this.pagination.currentPage,
          this.pagination.itemsPerPage
        )
        .subscribe(
          (PaginatedResult: PaginatedResult<Palestrante[]>) => {
            this.Palestrantes = PaginatedResult.result;
            this.pagination = PaginatedResult.pagination as Pagination;
          },
          (error: any) => {
            this.spinner.hide('spinner');
            this.toastr.error('Erro ao Carregar os palestrantes', 'Erro!');
          }
        )
        .add(() => this.spinner.hide('spinner'));
    }

}
