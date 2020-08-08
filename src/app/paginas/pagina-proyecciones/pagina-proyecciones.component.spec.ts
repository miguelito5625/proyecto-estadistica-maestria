import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaProyeccionesComponent } from './pagina-proyecciones.component';

describe('PaginaProyeccionesComponent', () => {
  let component: PaginaProyeccionesComponent;
  let fixture: ComponentFixture<PaginaProyeccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaProyeccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaProyeccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
