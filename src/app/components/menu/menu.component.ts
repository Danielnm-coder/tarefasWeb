import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {


  //atributos
  nomeUsuario : string = '';
  emailUsuario : string = '';
  isAuthenticated : boolean = false;


  //evento executado no momento em que
  //o componente é carregado / aberto
  ngOnInit(): void {
   
    //capturar os dados da local storage (usuário autenticado)
    var data = localStorage.getItem('usuario');
    //veficando se existe um usuário autenticado
    if(data != null) {
      //deserializar os dados em formato JSON
      var usuario = JSON.parse(data);


      //armazenar os dados
      this.nomeUsuario = usuario.nome;
      this.emailUsuario = usuario.email;
      this.isAuthenticated = true;
    }
  }


  //função para realizar o logout do usuário
  signOut() : void {
    if(confirm('Deseja realmente sair do sistema?')) {
      //apagar os dados gravados na local storage
      localStorage.removeItem('usuario');
      //redirecionar de volta para a página de login
      location.href = '/app/login';
    }
  }


}