import { Component, OnInit, NgModule } from "@angular/core";

@Component({
  selector: "app-contato",
  templateUrl: "./contato.component.html",
  styleUrls: ["./contato.component.css"]
})
export class ContatoComponent {
  todos = [];
  contatoNome = "";
  contatoEndereco = "";
  contatoNumero = "";
  contatoComplemento = "";
  contatoBairro = "";
  contatoTelefone = "";

  salvar(usuarioForm) {
    console.log(usuarioForm);
    console.log(usuarioForm.value.nome);

    const todo = {
      nome: this.contatoNome,
      endereco: this.contatoEndereco,
      numero: this.contatoNumero,
      complemento: this.contatoComplemento,
      bairro: this.contatoBairro,
      telefone: this.contatoTelefone
    };
  }
}
