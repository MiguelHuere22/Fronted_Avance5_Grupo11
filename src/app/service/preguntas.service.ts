import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pregunta } from '../model/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {
  private apiUrl = 'http://127.0.0.1:5000/respuestas/v1/preguntas';

  constructor(private http: HttpClient) { }

  getPreguntasPorTest(id_test: number): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(`${this.apiUrl}/${id_test}`);
  }

  enviarRespuestas(id_persona: number, id_test: number, respuestas: any[]): Observable<any> {
    const data = {
      id_persona: id_persona,
      id_test: id_test,
      respuestas: respuestas
    };
    return this.http.post<any>('http://127.0.0.1:5000/respuestas/v1/agregar', data);
  }
}
