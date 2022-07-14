import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogClientesComponent } from './dialog-clientes.component';

describe('DialogClientesComponent', () => {
  let component: DialogClientesComponent;
  let fixture: ComponentFixture<DialogClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
