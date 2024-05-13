import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isExpanded: any = {};

  private cdr: ChangeDetectorRef;
  // Inject UserService in the constructor
  constructor(public userService: UserService, cdr: ChangeDetectorRef) { 
    this.cdr = cdr; 
  }

  toggleMenu(menuItem: string) {
    const topLevelMenus = ['analysis'];
    const parentSubMenus = ['smartContract', 'fraudTransaction'];
    const smartContractSubMenus = ['solidity']; 
    const fraudSubMenus = ['ethereum', 'polygon', 'avalanche'];

    // If toggling a top level menu, ensure only one can be open at a time
    if (topLevelMenus.includes(menuItem)) {
      topLevelMenus.forEach(menu => {
        this.isExpanded[menu] = menu === menuItem ? !this.isExpanded[menu] : false;
      });
    }

    // Handle the second-level menus under 'analysis'
    if (parentSubMenus.includes(menuItem)) {
      if (!this.isExpanded[menuItem]) { // If currently not expanded, expand it
        this.isExpanded[menuItem] = true;
        // Collapse other sub-menus under the same parent
        parentSubMenus.forEach(menu => {
          if (menu !== menuItem) this.isExpanded[menu] = false;
        });
      } else { // If it's already expanded, just collapse it
        this.isExpanded[menuItem] = false;
      }
    }

    // Allow sub-menus under 'smartContract' and 'fraudTransaction' to toggle independently
    if (smartContractSubMenus.includes(menuItem) || fraudSubMenus.includes(menuItem)) {
      this.isExpanded[menuItem] = !this.isExpanded[menuItem];
    }

    this.updateView();
  }
  

  get isLoggedIn(): boolean {
    return this.userService.currentUserValue != null;
  }

  logout() {
    this.userService.logout();
  }

  // Call this method where needed to update the view
  private updateView() {
    this.cdr.detectChanges();
  }
}
