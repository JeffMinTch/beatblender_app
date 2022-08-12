import { Directive, HostBinding, Inject, Input, OnInit, OnDestroy, ElementRef, Renderer2, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

import { AppDropdownDirective } from './dropdown.directive';

@Directive({
  selector: '[appDropdownLink]',
})
export class DropdownLinkDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() public group: any;

  protected _open: boolean;
  protected nav: AppDropdownDirective;
  private htmlElement: HTMLElement;
  @Input("itemType") public itemType: 'dropdown' | 'link' | 'separator';



  @HostBinding('class.open')
  @Input()
  get open(): boolean {
    return this._open;
  }

  set open(value: boolean) {
    this._open = value;
    if (value) {
      // if(this.itemType === 'link'){
      //   this.renderer.addClass(this.elementRef.nativeElement,'open-nav-link');
      // }
      // this.htmlElement = (this.elementRef.nativeElement as HTMLElement);
      // this.setElementStyle('highlight');
      this.nav.closeOtherLinks(this);
      // (this.elementRef.nativeElement as HTMLElement).style.background = 'green';
    } else {
      // if(this.htmlElement.classList.contains('open-nav-link')) {
      //   this.renderer.removeClass(this.elementRef.nativeElement, 'open-nav-link');
      // }



      // this.setElementStyle('normal');
      // if((this.htmlElement.lastChild.lastChild)) {
      //   (this.elementRef.nativeElement as HTMLElement).style.background = 'white';
      //   (this.htmlElement.lastChild.lastChild.firstChild as HTMLElement).style.background = 'white';
      
      // }
    }
  }

  // public setElementStyle(style: 'highlight' | 'normal') {
  //   if(style === 'highlight') {

  //   } else {

  //   }


  //   if(this.htmlElement.id = "itemLvL1") {
  //     if((this.htmlElement.lastChild.lastChild)) {
  //       if((this.htmlElement.lastChild.lastChild.firstChild as HTMLElement).id === 'itemLvL2') {
  //         (this.htmlElement.lastChild.lastChild.firstChild as HTMLElement).style.background = 'green';
  //       } else {
  //         this.htmlElement.style.background = 'green';
  //       }
  //     }
  //   }
  // }

  public constructor(@Inject(AppDropdownDirective) nav: AppDropdownDirective, private elementRef: ElementRef, private renderer: Renderer2) {
    this.nav = nav;
  }
  

  public ngOnInit(): any {
    this.nav.addLink(this);
      this.htmlElement = (this.elementRef.nativeElement as HTMLElement);
  }

  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    let that = this;
    setTimeout(() => {
      if(that.htmlElement.classList.contains('open')) {
        if(that.itemType === 'link'){
          that.renderer.addClass(that.elementRef.nativeElement,'open-nav-link');
        }
      } else {
        if(that.htmlElement.classList.contains('open-nav-link')) {
          that.renderer.removeClass(that.elementRef.nativeElement, 'open-nav-link');
        }
        
      }
    }, 100);
  }

  public ngOnDestroy(): any {
    this.nav.removeGroup(this);
  }

  public toggle(): any {
    this.open = !this.open;
  }
}
