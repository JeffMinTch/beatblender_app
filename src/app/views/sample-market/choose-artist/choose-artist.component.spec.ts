import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseArtistComponent } from './choose-artist.component';

describe('ChooseArtistComponent', () => {
  let component: ChooseArtistComponent;
  let fixture: ComponentFixture<ChooseArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
