import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Numero } from './numero';
import { NumeroService } from '../numero.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-numero',
  templateUrl: './numero.component.html',
  styleUrls: ['./numero.component.css']
})
export class NumeroComponent implements OnInit, OnChanges {

  @Input() contato;

  public numero = [];
  public numeroTelefone = new Numero();
  public message = [];

  constructor(private numeroService: NumeroService, private confirmService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.contato) {
      this.pesquisaTelefone();
    }
  }

  public pesquisaTelefone() {
    this.numeroService.listTelefone(this.contato.id).subscribe(numero => {
      this.numero = numero;
    });
  }

  public addNumero() {
    const numero = {
      id: this.numeroTelefone.id,
      contatoNome: this.numeroTelefone.contatoNome,
      telefone: this.numeroTelefone.telefone,
      cadastro: {
        id: this.contato.id
      }
    };
    if (numero.id) {
      this.numeroService.updateTelefone(numero).subscribe(telefone => {
        this.pesquisaTelefone();
        this.numeroTelefone = new Numero();
      });
    } else {
      this.numeroService.addNumero(numero).subscribe(telefone => {
        if (telefone != null) {
          this.numero.push(telefone);
          this.numero = this.numero.slice();
          this.numeroTelefone = new Numero();
          this.numeroTelefone.telefone = '';
          this.numeroTelefone.contatoNome = '';
          this.messageService.add({ key: 'tL', severity: 'success', summary: 'Numero criado com sucesso' });
        } else {
          alert('Numero ja existe');
        }
      });
    }
  }

  public deleteNumero(numero) {
    this.numero = this.numero.filter(numeroItem => {
      return numeroItem !== numero;
    });
    this.messageService.add({ key: 'tl', severity: 'error', summary: 'Cadastro Apagado com sucesso' });
    this.numeroService.deleteTelefone(numero).subscribe();
  }

  public editNumero(numero) {
    this.numeroTelefone = { ...numero };
  }



}
