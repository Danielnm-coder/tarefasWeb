import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaTarefasComponent } from './consultar-tarefas.component';

describe('ConsultarTarefasComponent', () => {
  let component: ConsultaTarefasComponent;
  let fixture: ComponentFixture<ConsultaTarefasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaTarefasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
