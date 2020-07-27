import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaHistogramaComponent } from './pagina-histograma.component';

describe('PaginaHistogramaComponent', () => {
  let component: PaginaHistogramaComponent;
  let fixture: ComponentFixture<PaginaHistogramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaHistogramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaHistogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
