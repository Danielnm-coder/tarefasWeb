import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-tarefas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cadastro-tarefas.component.html',
  styleUrl: './cadastro-tarefas.component.css'
})
export class CadastroTarefasComponent implements OnInit {

  categorias: any[] = [];


  //método construtor (injeção de dependencia)
  constructor(private httpClient: HttpClient){

  }

  ngOnInit(): void {
    
    this.httpClient.get('http://localhost:5055/api/categorias')
      .subscribe({
        next: (data) => {
         this.categorias = data as any[];
        },
        error:(e) =>{
          console.log(e);
        }
      })
  }

}
