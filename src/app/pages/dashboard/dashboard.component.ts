import { Component, OnInit, inject, signal,OnDestroy } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Dashboard } from '../../modal/master';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy{
  dashboardcomp: any;
  masterSrv= inject(MasterService)
  empRole: string = '';
  empId : number =  0;

  ngOnInit(): void {
    this.empRole = this.masterSrv.loggedUserData.role
    this.empId = this.masterSrv.loggedUserData.employeeId
   this.checkandLoadData(this.empId);   
  }

  ngOnDestroy(): void {
    
  }


  checkandLoadData(id: number){
    if(this.masterSrv.loggedUserData.role === 'Admin'){
      this.masterSrv.GetHRDashboard().subscribe((res:Dashboard)=>{
        this.dashboardcomp = res
      })
    } else{
      this.masterSrv.getEmpployeeLeaveDashboard(id).subscribe((res:Dashboard)=>{
        this.dashboardcomp = res
      })
      
    }
  }

  checkUserRole(): boolean{
    console.log(this.masterSrv.loggedUserData.role == 'Employee')
    return this.masterSrv.loggedUserData.role == 'Employee'
  }
}

