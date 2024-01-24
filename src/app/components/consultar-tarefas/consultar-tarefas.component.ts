import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-consulta-tarefas',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './consultar-tarefas.component.html',
  styleUrl: './consultar-tarefas.component.css',
})
export class ConsultaTarefasComponent implements OnInit {
 
  //atributo
  tarefas: any[] = []; //lista vazia


  //método construtor para injeção de dependência
  constructor(private httpClient: HttpClient) {}


  //função executada no momento em que
  //o componente é aberto no navegador
  ngOnInit(): void {
    //fazendo uma chamada na api para consultar as tarefas
    this.httpClient.get('http://localhost:5055/api/tarefas').subscribe({
      //capturando o retorno da API
      next: (data) => {
        //retorno de sucesso
        //guardar os dados obtidos da API
        this.tarefas = data as any[];
      },
      error: (e) => {
        //retorno de erro
        console.log(e);
      },
    });
  }
}




