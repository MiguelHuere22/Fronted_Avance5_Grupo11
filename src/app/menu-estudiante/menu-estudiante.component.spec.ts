import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuEstudianteComponent } from './menu-estudiante.component';

describe('MenuEstudianteComponent', () => {
  let component: MenuEstudianteComponent;
  let fixture: ComponentFixture<MenuEstudianteComponent>;

  beforeEach(() => {
    let store: { [key: string]: string | null } = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string): string | null => {
      return store[key] || null;
    });

    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): void => {
      store[key] = value;
    });

    spyOn(localStorage, 'clear').and.callFake(() => {
      store = {};
    });

    TestBed.configureTestingModule({
      imports: [MenuEstudianteComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
