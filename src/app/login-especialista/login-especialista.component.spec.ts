import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEspecialistaComponent } from './login-especialista.component';

describe('LoginEspecialistaComponent', () => {
  let component: LoginEspecialistaComponent;
  let fixture: ComponentFixture<LoginEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginEspecialistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
