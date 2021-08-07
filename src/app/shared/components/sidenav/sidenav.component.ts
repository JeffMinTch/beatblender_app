import { DropdownLinkDirective } from './../../directives/dropdown-link.directive';
import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.template.html'
})
export class SidenavComponent {

  @ViewChildren(DropdownLinkDirective) public navListElements: QueryList<any>;
  @Input('items') public menuItems: any[] = [];
  @Input('hasIconMenu') public hasIconTypeMenuItem: boolean;
  @Input('iconMenuTitle') public iconTypeMenuTitle: string;
  @Input('titleColor') public titleColor: 'primary' | 'accent' | 'body';


  constructor(private renderer: Renderer2) { }
  ngOnInit() { }

  // Only for demo purpose
  addMenuItem() {
    this.menuItems.push({
      name: 'ITEM',
      type: 'dropDown',
      tooltip: 'Item',
      icon: 'done',
      state: 'material',
      sub: [
        { name: 'SUBITEM', state: 'cards' },
        { name: 'SUBITEM', state: 'buttons' }
      ]
    });
  }

  setTitleColor() {
    switch (this.titleColor) {
      case 'primary':
        return {
          color: 'var(--primary-color)'
        }
      case 'accent':
        return {
          color: 'var(--accent-color)'
        }
      case 'body':
        return {
          color: 'var(--body-color)'
        }
      default:
        return {
          color: 'var(--light-theme)'
        }
    }

  }

  changeNavListStyle(el: HTMLElement, itemType: 'dropdown' | 'link' | 'separator') {
    // console.log(this.navListElements);
    if(itemType === 'link') {
      this.renderer.addClass(el, 'open-nav-link');
  
      this.navListElements.toArray().map((navListElement) => (navListElement.elementRef.nativeElement as HTMLElement)).filter((navListElement) => (navListElement as HTMLElement) !== el).forEach((navListElement) => {
        if((navListElement as HTMLElement).classList.contains('open-nav-link')) {
          this.renderer.removeClass(navListElement, 'open-nav-link');
        }
      });
    }
  }
}