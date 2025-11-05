import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { RedeSocial } from '@app/models/RedeSocial';

@Injectable({
  providedIn: 'root',
})
export class RedeSocialService {
  baseUrl = environment.apiURL + 'api/redesSociais';

constructor(private http: HttpClient) { }

/**
 *
 * @param origem Precisa passar a palavra 'palestrante' ou 'evento' - Escrito em minúsulo.
 * @param id Precisa passar o PalestranteId ou o EventoId dependendo da sua origem.
 * @returns Observable<RedeSocial[]>
 */
public getRedesSociais(origem: string, id: number): Observable<RedeSocial[]> {
  let url =
    id === 0
      ? `${this.baseUrl}/${origem}`
      : `${this.baseUrl}/${origem}/${id}`;

  return this.http.get<RedeSocial[]>(url).pipe(take(1));
}

/**
 *
 * @param origem Precisa passar a palavra 'palestrante' ou 'evento' - Escrito em minúsulo.
 * @param id Precisa passar o PalestranteId ou o EventoId dependendo da sua origem.
 * @param redesSociais Precisa adicionar RedesSociais organizadas em RedeSocial[] para salvar.
 * @returns Observable<RedeSocial[]>
 */
public saveRedesSociais(
  origem: string,
  id: number,
  redesSociais: RedeSocial[]
): Observable<RedeSocial[]> {
  let url =
    id === 0
      ? `${this.baseUrl}/${origem}`
      : `${this.baseUrl}/${origem}/${id}`;

  return this.http.put<RedeSocial[]>(url, redesSociais).pipe(take(1));
}

/**
 *
 * @param origem Precisa passar a palavra 'palestrante' ou 'evento' - Escrito em minúsulo.
 * @param id Precisa passar o PalestranteId ou o EventoId dependendo da sua origem.
 * @param redesSocialId Precisa usar o id da Rede Social.
 * @returns Observable<any> - Pois é o retorno da rota.
 */
public deleteRedeSocial(
  origem: string,
  id: number,
  redeSocialId: number
): Observable<any> {
  let url =
    id === 0
      ? `${this.baseUrl}/${origem}/${redeSocialId}`
      : `${this.baseUrl}/${origem}/${id}/${redeSocialId}`;

  return this.http.delete<RedeSocial[]>(url).pipe(take(1));
}

}
