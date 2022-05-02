import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamFormComponent } from './add-team-form.component';

describe('AddTeamFormComponent', () => {
  let component: AddTeamFormComponent;
  let fixture: ComponentFixture<AddTeamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeamFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
