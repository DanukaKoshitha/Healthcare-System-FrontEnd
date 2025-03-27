import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashBoardComponent } from './user-dash-board.component';

describe('UserDashBoardComponent', () => {
  let component: UserDashBoardComponent;
  let fixture: ComponentFixture<UserDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDashBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
