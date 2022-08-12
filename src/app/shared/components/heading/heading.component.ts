import { Breadcrumb } from './../../models/breadcrumb.model';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {

  @Input() breadcrumbs: Array<Breadcrumb>;
  @Input() title: string;
  @Input() subTitle: string;


  constructor() { }

  ngOnInit(): void {
    
  }

}
