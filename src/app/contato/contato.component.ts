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
          alert('Name already exist');
        }
      });
    }
  }

  public deleteCad(cad) {
    this.confirmService.confirm({
      message: 'Tem certeza de que quer continuar?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.message = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
        this.cadastro = this.cadastro.filter(cadItem => {
          return cadItem !== cad;
        });
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Cadastro Apagado com sucesso' });
        this.cadService.deleteCadastro(cad).subscribe();
      },
      reject: () => {
        this.message = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
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
