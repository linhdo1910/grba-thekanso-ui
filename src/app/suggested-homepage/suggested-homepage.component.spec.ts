import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedHomepageComponent } from './suggested-homepage.component';

describe('SuggestedHomepageComponent', () => {
  let component: SuggestedHomepageComponent;
  let fixture: ComponentFixture<SuggestedHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuggestedHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestedHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
