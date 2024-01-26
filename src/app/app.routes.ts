import { Routes } from '@angular/router';
import { CadastroTarefasComponent } from './components/cadastro-tarefas/cadastro-tarefas.component';
import { ConsultaTarefasComponent } from './components/consultar-tarefas/consultar-tarefas.component';
import { EdicaoTarefasComponent } from './components/edicao-tarefas/edicao-tarefas.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'app/cadastro-tarefas',
        component: CadastroTarefasComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'app/consulta-tarefas',
        component: ConsultaTarefasComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'app/edicao-tarefas',
        component: EdicaoTarefasComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'app/login',
        component:LoginComponent
    },
    {
        path: '',
        pathMatch:'full',
        redirectTo: '/app/login'
    }
];
