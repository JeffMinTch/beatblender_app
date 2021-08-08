import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadSampleComponent } from './download-sample.component';

describe('DownloadSampleComponent', () => {
  let component: DownloadSampleComponent;
  let fixture: ComponentFixture<DownloadSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
