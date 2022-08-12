import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioTilesComponent } from './audio-tiles.component';

describe('AudioTilesComponent', () => {
  let component: AudioTilesComponent;
  let fixture: ComponentFixture<AudioTilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioTilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
