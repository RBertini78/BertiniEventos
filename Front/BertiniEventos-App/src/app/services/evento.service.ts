import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { Evento } from '../models/Evento';



@Injectable({
    providedIn: 'root'
})
export class EventoService {
    baseURL = 'https://localhost:7251/api/eventos';

    constructor(private http: HttpClient) {}

    public getEventos(): Observable<Evento[]> {
        return this.http.get<Evento[]>(this.baseURL).pipe(take(1));
    }
    
    public getEventosByTema(tema: string): Observable<Evento[]> {
        return this.http.get<Evento[]>(`${this.baseURL}/${tema}/tema`).pipe(take(1));
    }
    public getEventosById(id: number): Observable<Evento> {
        return this.http.get<Evento>(`${this.baseURL}/${id}`).pipe(take(1));
    }
    public post(evento: Evento): Observable<Evento> {
        return this.http.post<Evento>(this.baseURL, evento).pipe(take(1));
    }
    public put(evento: Evento): Observable<Evento> {
        return this.http.put<Evento>(`${this.baseURL}/${evento.id}`, evento).pipe(take(1));
    }
    public deleteEvento(id: number): Observable<any> {
        return this.http.delete(`${this.baseURL}/${id}`).pipe(take(1));
    }
    
}

