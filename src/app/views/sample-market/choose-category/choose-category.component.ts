import { Component, OnInit } from '@angular/core';

export interface LicenseCategoryTile {
  name: string;
  path: string;
  percentage: number
}

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.scss']
})
export class ChooseCategoryComponent implements OnInit {

  licenseCategoryList: LicenseCategoryTile[] = [
    // {
    //   name: 'All',
    //   path: 'all'
    // },
    {
      name: 'BB-100',
      path: 'bb-100',
      percentage: 100
    },
    {
      name: 'BB-70',
      path: 'bb-70',
      percentage: 70
    },
    {
      name: 'BB-30',
      path: 'bb-30',
      percentage: 30
    },

  
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
