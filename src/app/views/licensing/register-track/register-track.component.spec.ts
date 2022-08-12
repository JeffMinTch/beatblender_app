import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTrackComponent } from './register-track.component';

describe('RegisterTrackComponent', () => {
  let component: RegisterTrackComponent;
  let fixture: ComponentFixture<RegisterTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
