import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { config } from '../../config/config';


@Component({
  selector: 'app-consulta-tarefas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultar-tarefas.component.html',
  styleUrl: './consultar-tarefas.component.html',
})
export class ConsultaTarefasComponent implements OnInit {
 
  //atributo
  tarefas: any[] = []; //lista vazia
  httpHeaders: HttpHeaders | null = null;
  mensagem: string = '';


  //método construtor para injeção de dependência
  constructor(private httpClient: HttpClient) {}


  //função executada no momento em que
  //o componente é aberto no navegador
  ngOnInit(): void {


    //capturando o usuário autenticado
    var usuario = JSON.parse(localStorage.getItem('usuario') as string);
    //criando um cabeçalho da requisição para enviar o TOKEN
    this.httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${usuario.accessToken}`
    });


    //fazendo uma chamada na api para consultar as tarefas
    this.httpClient.get(config.apiTarefas + '/tarefas',
    { headers: this.httpHeaders }).subscribe({
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


  //função para realizar a exclusão da tarefa
  onDelete(id: string): void {
    if(confirm('Deseja realmente excluir a tarefa selecionada?') && this.httpHeaders != null) {
     
      //enviando uma requisição de exclusão para a API
      this.httpClient.delete(config.apiTarefas + "/tarefas/" + id,
        { headers: this.httpHeaders }).subscribe({
          next: (data: any) => {
            this.mensagem = data.mensagem;
            this.ngOnInit();
          },
          error: (e) => {
            this.mensagem = 'Falha ao excluir a tarefa.';
            console.log(e.error);
          }
        })
    }
  }


}





