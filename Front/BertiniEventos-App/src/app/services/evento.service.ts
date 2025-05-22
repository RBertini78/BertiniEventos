import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';



@Injectable({
    providedIn: 'root'
})
export class EventoService {
    baseURL = 'https://localhost:5001/api/eventos';

    constructor(private http: HttpClient) {}

    public getEventos(): Observable<Evento[]> {
        return this.http.get<Evento[]>(this.baseURL);
    }
    
    public getEventosByTema(tema: string): Observable<Evento[]> {
        return this.http.get<Evento[]>(`${this.baseURL}/${tema}/tema`);
    }
    public getEventosById(id: number): Observable<Evento> {
        return this.http.get<Evento>(`${this.baseURL}/${id}/id`);
    }
    public postEvento(evento: Evento): Observable<Evento> {
        return this.http.post<Evento>(this.baseURL, evento);
    }
    public putEvento(evento: Evento): Observable<Evento> {
        return this.http.put<Evento>(`${this.baseURL}/${evento.id}`, evento);
    }
    
}

