import { IMenuItem } from './../../shared/services/navigation.service';
import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ILayoutConf, LayoutService } from '../../shared/services/layout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-view',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, AfterViewInit {

  public panelOpenState = false;

  public menuItems: IMenuItem[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  public layoutConf: ILayoutConf;
  public isMenu: boolean =true;

  constructor(
    private layoutService: LayoutService,
    // public themeService: ThemeService,
    private cdr: ChangeDetectorRef


  ) {

    

    // this.navService.menuItems$.subscribe(menuItems => {
      //   // let that = this;
      //   console.log(menuItems);
      //   this.menuItems = menuItems;
      
      //   //Checks item list has any icon type.
      //   // this.hasIconTypeMenuItem = !!this.menuItems.filter(
        //   //   item => item.type === "icon"
        //   // ).length;
        // });
        this.layoutConf = this.layoutService.layoutConf;
      }


  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }
  
  ngOnInit(): void {
    console.log('Sidenav Component');
    // this.navService.menuItems$.subscribe((menuItems: IMenuItem[]) => {
    //   this.menuItems = menuItems;
    //     this.cdr.detectChanges();
  
    // });
    this.layoutService.layoutConf$.subscribe((layoutConf) => {
      // this.isMenu = false;
      // setTimeout(() => {
      //   this.isMenu = true;
      //   this.layoutConf = layoutConf;
      // }, 1000);
    });
  }


}
