import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToDistributeComponent } from './how-to-distribute.component';

describe('HowToDistributeComponent', () => {
  let component: HowToDistributeComponent;
  let fixture: ComponentFixture<HowToDistributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToDistributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToDistributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
