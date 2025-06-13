import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilaProductoComponent } from './fila-producto.component';

describe('FilaProductoComponent', () => {
  let component: FilaProductoComponent;
  let fixture: ComponentFixture<FilaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilaProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
