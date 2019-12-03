import { Component, OnInit, NgModule } from "@angular/core";
import { CadastrosService } from "../cadastros.service";
import { Contato } from "./model/contato";

@Component({
  selector: "app-contato",
  templateUrl: "./contato.component.html",
  styleUrls: ["./contato.component.css"]
})
export class ContatoComponent implements OnInit {
  public cadastro = [];
  public contato = new Contato();
  constructor(private cadService: CadastrosService) {}

  ngOnInit() {
    this.cadService.listCadastro().subscribe(cadastro => {
      this.cadastro = cadastro;
    });
  }

  public addCad() {
    const cad = {
      nome: this.contato.nome,
      endereco: this.contato.endereco,
      numero: this.contato.numero,
      complemento: this.contato.complemento,
      bairro: this.contato.bairro,
      telefone: this.contato.telefone
    };
    this.cadService.addCadastro(cad).subscribe(cad => {
      this.cadastro.push(cad);
      this.cadastro = this.cadastro.slice();
    });
  }

  public deleteCad(cad) {
    this.cadastro = this.cadastro.filter(cadItem => {
      return cadItem !== cad;
    });
  }

  public editCad(cad) {
    cad.editCad = !cad.editCad;
    this.cadService.updateCadastro(cad).subscribe();
  }
}
