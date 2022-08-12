import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
// import PerfectScrollbar from 'perfect-scrollbar';
import { NavigationService } from "../../../shared/services/navigation.service";
import { Subscription } from "rxjs";
import { ILayoutConf, LayoutService } from '../../../shared/services/layout.service';

@Component({
  selector: 'app-sidebar-top',
  templateUrl: './sidebar-top.component.html'
})
export class SidebarTopComponent implements OnInit, OnDestroy, AfterViewInit {
  // private sidebarPS: PerfectScrollbar;
  public menuItems: any[];
  private menuItemsSub: Subscription;
  public hasIconTypeMenuItem: boolean;
  public layoutConf: ILayoutConf;


  constructor(
    private navService: NavigationService,
    private layout: LayoutService,

  ) { }

  ngOnInit() {
    // this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
    //   this.menuItems = menuItem.filter(item => item.type !== 'icon' && item.type !== 'separator');
    // });
    // this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
      this.menuItemsSub = this.navService.quickAccessItems$.subscribe(menuItem => {
        this.menuItems = menuItem;
        //Checks item list has any icon type.
        this.hasIconTypeMenuItem = !!this.menuItems.filter(
          item => item.type === "icon"
        ).length;
      });
      this.layoutConf = this.layout.layoutConf;
  }
  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.sidebarPS = new PerfectScrollbar('#sidebar-top-scroll-area', {
    //     suppressScrollX: true
    //   })
    // })
  }
  ngOnDestroy() {
    // if(this.sidebarPS) {
    //   this.sidebarPS.destroy();
    // }
    if( this.menuItemsSub ) {
      this.menuItemsSub.unsubscribe()
    }
  }

}
