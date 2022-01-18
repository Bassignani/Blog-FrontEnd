import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEdiComponent } from './user-edi.component';

describe('UserEdiComponent', () => {
  let component: UserEdiComponent;
  let fixture: ComponentFixture<UserEdiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEdiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
