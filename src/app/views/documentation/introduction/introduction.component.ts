import { ElementRef, QueryList, Renderer2, ViewChildren, AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit, AfterViewInit {

  @ViewChildren('soundBar') public soundbars: QueryList<ElementRef>;


  constructor(
    private renderer: Renderer2
  ) { }
  
  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    console.log(this.soundbars);
    this.soundbars.toArray().forEach((soundbar => {
      this.renderer.setStyle(soundbar.nativeElement, 'height', Math.random() * 50 + 'px');
    }));
  }
}
