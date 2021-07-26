import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ILayoutConf, LayoutService } from 'app/shared/services/layout.service';
import { NavigationService } from 'app/shared/services/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-view',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public panelOpenState = false;

  public menuItems: any;
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  public layoutConf: ILayoutConf;

  constructor(
    private navService: NavigationService,
    // public themeService: ThemeService,
    private layout: LayoutService,
    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    this.navService.menuItems$.subscribe(menuItems => {
      // let that = this;
      console.log(menuItems);
        this.menuItems = menuItems;

      //Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(
        item => item.type === "icon"
      ).length;
      this.cdr.detectChanges();
    });
    this.layoutConf = this.layout.layoutConf;
  }

}
