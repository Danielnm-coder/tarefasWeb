import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { config } from '../../config/config';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-cadastro-tarefas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastro-tarefas.component.html',
  styleUrl: './cadastro-tarefas.component.css'
})
export class CadastroTarefasComponent implements OnInit {


  //atributos
  categorias: any[] = [];
  httpHeaders: HttpHeaders | null = null;
  mensagem: string = '';


  //método construtor (injeção de dependência)
  constructor(private httpClient: HttpClient) {
  }


  //estrutura do formulário
  form = new FormGroup({
    nome : new FormControl('', [Validators.required]),
    dataHora: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    prioridade: new FormControl('', [Validators.required]),
    categoriaId: new FormControl('', [Validators.required])
  });


  //função para verificar se os campos do formulário
  //possuem algum erro de validação
  get f() {
    return this.form.controls;
  }


  //método executado quando o componente é aberto
  ngOnInit(): void {


    //capturando o usuário autenticado
    var usuario = JSON.parse(localStorage.getItem('usuario') as string);
    //criando um cabeçalho da requisição para enviar o TOKEN
    this.httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${usuario.accessToken}`
    });


    //fazendo uma requisição HTTP GET na API
    this.httpClient.get(config.apiTarefas + '/categorias', { headers: this.httpHeaders })
      .subscribe({ //capturando o retorno da API
        next: (data) => {
          //guardar o resultado no atributo do componente
          this.categorias = data as any[];
        },
        error: (e) => {
          console.log(e);
        }
      })
  }


  onSubmit(): void {


    if(this.httpHeaders != null) {
      //fazendo uma requisição HTTP POST para a API
      this.httpClient.post(config.apiTarefas + "/tarefas", this.form.value,
        { headers : this.httpHeaders }).subscribe({
            next: (data: any) => {
              //exibir a mensagem obtida da API
              this.mensagem = data.mensagem;
              //limpar o formulário
              this.form.reset();
            },
            error: (e) => {
              this.mensagem = 'Falha ao cadastrar tarefa.';
              console.log(e.error);
            }
        });
    }
  }


}





