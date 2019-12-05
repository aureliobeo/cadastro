import { Component, OnInit, NgModule } from '@angular/core';
import { CadastrosService } from '../cadastros.service';
import { Contato } from './model/contato';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  public cadastro = [];
  public contato = new Contato();
  public message = [];
  public display = false;
  public cadastroTelefone;

  constructor(private cadService: CadastrosService, private confirmService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this.pesquisar();
  }

  public pesquisar() {
    this.cadService.listCadastro().subscribe(cadastro => {
      this.cadastro = cadastro;
    });
  }

  public addCad() {
    const cad = {
      id: this.contato.id,
      nome: this.contato.nome,
      endereco: this.contato.endereco,
      numero: this.contato.numero,
      complemento: this.contato.complemento,
      bairro: this.contato.bairro,
    };

    if (cad.id) {
      this.cadService.updateCadastro(cad).subscribe(usuario => {
        this.pesquisar();
        this.messageService.add({ key: 'tL', severity: 'success', summary: 'Cadastro atualizado com sucesso' });
        this.contato = new Contato();
      });
    } else {
      this.cadService.addCadastro(cad).subscribe(usuario => {
        if (usuario != null) {
          this.cadastro.push(usuario);
          this.cadastro = this.cadastro.slice();
          this.contato = new Contato();
          this.contato.nome = '';
          this.contato.endereco = '';
          // this.contato.numero = '';
          this.contato.complemento = '';
          this.contato.bairro = '';
          this.messageService.add({ key: 'tL', severity: 'success', summary: 'Cadastro criado com sucesso' });
        } else {
          this.messageService.add({ key: 'tL', severity: 'warn', summary: 'Cadastro informado ja existe' });
        }
      });
    }
  }

  public deleteCad(cad) {
    this.confirmService.confirm({
      message: 'Tem certeza de que quer excluir o contato?',
      header: 'Excluir contato',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.cadastro = this.cadastro.filter(cadItem => {
          return cadItem !== cad;
        });
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Contato excluido com sucesso' });
        this.cadService.deleteCadastro(cad).subscribe();
      },
      reject: () => { }
    });
  }

  public editCad(cad) {
    this.contato = { ...cad };
  }

  public showCadastro(cad) {
    this.display = true;
    this.cadastroTelefone = cad;
  }
}
