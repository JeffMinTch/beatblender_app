import { SizeRatio } from './../../models/types/size.type';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent implements OnInit {

  @Input() size: SizeRatio = 'md';
  @Input() vertical: boolean = false;
  @Input() color: string = 'var(--body-color)';

  constructor() { }

  ngOnInit(): void {
  }

  setSize(): string {

    switch (this.size) {
      case 'xs':
        return 'divider-xs';
      case 'sm':
        return 'divider-sm';
      case 'md':
        return 'divider-md';
      case 'lg':
        return 'divider-lg';
      case 'xl':
        return 'divider-xl';
    }


  }


}
