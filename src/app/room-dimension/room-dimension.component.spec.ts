import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDimensionComponent } from './room-dimension.component';

describe('RoomDimensionComponent', () => {
  let component: RoomDimensionComponent;
  let fixture: ComponentFixture<RoomDimensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomDimensionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomDimensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
