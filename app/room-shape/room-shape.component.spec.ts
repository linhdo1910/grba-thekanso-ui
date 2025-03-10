import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomShapeComponent } from './room-shape.component';

describe('RoomShapeComponent', () => {
  let component: RoomShapeComponent;
  let fixture: ComponentFixture<RoomShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomShapeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
