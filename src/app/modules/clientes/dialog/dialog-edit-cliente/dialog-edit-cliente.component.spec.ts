import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditClienteComponent } from './dialog-edit-cliente.component';

describe('DialogEditClienteComponent', () => {
  let component: DialogEditClienteComponent;
  let fixture: ComponentFixture<DialogEditClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
