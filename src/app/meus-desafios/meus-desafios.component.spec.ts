import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusDesafiosComponent } from './meus-desafios.component';

describe('MeusDesafiosComponent', () => {
  let component: MeusDesafiosComponent;
  let fixture: ComponentFixture<MeusDesafiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeusDesafiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeusDesafiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
