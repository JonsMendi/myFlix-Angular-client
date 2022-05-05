import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditCardComponent } from './profile-edit-card.component';

describe('ProfileEditCardComponent', () => {
  let component: ProfileEditCardComponent;
  let fixture: ComponentFixture<ProfileEditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
