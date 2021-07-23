import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAudioUnitComponent } from './edit-audio-unit.component';

describe('EditAudioUnitComponent', () => {
  let component: EditAudioUnitComponent;
  let fixture: ComponentFixture<EditAudioUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAudioUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAudioUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
