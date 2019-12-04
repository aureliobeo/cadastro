import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API = 'http://localhost:8080/numero/';

@Injectable({
  providedIn: 'root'
})
export class NumeroService {

  constructor(private httpCliente: HttpClient) { }

  addNumero(numero) {
    return this.httpCliente.post(API, numero);
  }

  listTelefone(id) {
    return this.httpCliente.get(API + `${id}`).pipe(map(res => res as object[]));
  }

  deleteTelefone(deleteNumero) {
    return this.httpCliente.delete(API + deleteNumero.id);
  }

  updateTelefone(updateNumero) {
    return this.httpCliente.put(API + updateNumero.id, updateNumero);
  }
}
