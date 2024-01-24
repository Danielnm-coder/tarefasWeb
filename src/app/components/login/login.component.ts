import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { config } from '../../config/config';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  //variável
  mensagem: string = '';


  //método construtor
  constructor(
    private httpClient: HttpClient
  ) {    
  }


  //criando um formulário
  form = new FormGroup({
    /* campo 'email' */
    email: new FormControl('', [
      Validators.required, Validators.email]
      ),
    /* campo 'senha' */
    senha: new FormControl('', [
      Validators.required, Validators.minLength(8), Validators.maxLength(20)]
      )
  });


  //função auxiliar para verificar se os campos
  //do formulário estão com algum erro de preenchimento
  get f() {
    return this.form.controls;
  }


  //função para capturar o SUBMIT do formulário
  onSubmit(): void {
   
      //fazendo a chamada para a API de usuários
      this.httpClient.post(config.apiUsuarios + '/usuarios/autenticar', this.form.value)
        .subscribe({ //capturando a resposta da API
          next: (data: any) => { //recebendo o retorno de sucesso
           
            //salvar os dados do usuário na local storage
            localStorage.setItem('usuario', JSON.stringify(data));


            //redirecionar para a página de consulta de tarefas
            location.href = '/app/consulta-tarefas';
          },
          error: (e: any) => { //recebendo o retorno de erro
            this.mensagem = e.error.message;
          }
        })
  }


}
