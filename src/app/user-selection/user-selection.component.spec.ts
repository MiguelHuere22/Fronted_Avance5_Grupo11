import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSelectionComponent } from './user-selection.component';

describe('UserSelectionComponent', () => {
  let component: UserSelectionComponent;
  let fixture: ComponentFixture<UserSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSelectionComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login-student', () => {
    spyOn(component['router'], 'navigate');
    component.navigateTo('login-student');
    expect(component['router'].navigate).toHaveBeenCalledWith(['login-student']);
  });

  it('should navigate to login-specialist', () => {
    spyOn(component['router'], 'navigate');
    component.navigateTo('login-specialist');
    expect(component['router'].navigate).toHaveBeenCalledWith(['login-specialist']);
  });
});
