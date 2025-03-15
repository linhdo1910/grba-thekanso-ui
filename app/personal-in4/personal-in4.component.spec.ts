import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalIn4Component } from './personal-in4.component';

describe('PersonalIn4Component', () => {
  let component: PersonalIn4Component;
  let fixture: ComponentFixture<PersonalIn4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalIn4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalIn4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
