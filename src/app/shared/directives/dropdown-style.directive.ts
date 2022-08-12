import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropdownStyle]'
})
export class DropdownStyleDirective implements OnInit {



  // @HostBinding('class.open')
  // public changeStyle() {
  //   // if(this.itemType) {
  //   //   console.log('itemType');
  //   //   console.log(this.itemType);
  //   // }
  // }


  constructor() { }

  ngOnInit(): void {
    // console.log('itemType');
    // console.log(this.itemType);
  }

}
