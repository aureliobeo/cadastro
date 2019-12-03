import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, take } from "rxjs/operators";

const API = "http://localhost:8080/cadastro/";

@Injectable({
  providedIn: "root"
})
export class CadastrosService {
  constructor(private httpCliente: HttpClient) {}

  addCadastro(cadastro) {
    return this.httpCliente.post(API, cadastro);
  }

  listCadastro() {
    return this.httpCliente.get(API).pipe(map(res => res as object[]));
  }

  deleteCadastro(del) {
    return this.httpCliente.delete(API + del.id);
  }

  updateCadastro(update) {
    return this.httpCliente.put(API + update.id, update);
  }
}
