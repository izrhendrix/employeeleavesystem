import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  loggedUserData: any;

  constructor (private router: Router){
    //user is logged in and local data is saved , get that to show info. Can also be session data
    const localData = localStorage.getItem("leaveUser")
    if(localData) {
      this.loggedUserData = JSON.parse(localData);
    }
  }

  onLogOff(){
    //clear the local storage first then navigate back out
    localStorage.removeItem("leaveUser")
    this.router.navigateByUrl('login')
  }

}
