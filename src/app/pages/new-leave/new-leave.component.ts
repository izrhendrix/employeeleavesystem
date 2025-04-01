import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APIResponse, employee, LeaveRequest, LeaveType } from '../../modal/master';
import { MasterService } from '../../services/master.service';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-leave',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, AsyncPipe, DatePipe],
  templateUrl: './new-leave.component.html',
  styleUrl: './new-leave.component.css'
})
export class NewLeaveComponent implements OnInit {
 masterSrv= inject(MasterService)
 leavForm: FormGroup = new FormGroup({});
 leaveType = signal<LeaveType[]> ([]);
 employee$: Observable<employee[]> = new Observable<employee[]>
requestList :LeaveRequest[] = [];

 constructor(){
  this.initializeForm()
 }
  
 ngOnInit(): void { 
   this.getLeaveType()
   this.employee$ = this.masterSrv.getAllemployees()
  this.getGridData();
 }

 getGridData(){
  if(this.masterSrv.loggedUserData.role =='Employee'){
    this.getData();
   }else{
     this.getAllData();
   }
 }

 getData(){
  this.masterSrv.getLeaveRequestById(this.masterSrv.loggedUserData.employeeId).subscribe((res: APIResponse)=>{
    this.requestList = res.data
  })
 }

 getAllData(){
  this.masterSrv.getAllLeaveRequests().subscribe((res: APIResponse)=>{
    this.requestList = res.data
  })
 }


 initializeForm(){
  this.leavForm = new FormGroup({
    leaveId: new FormControl(0),
    employeeId: new FormControl(this.masterSrv.loggedUserData.employeeId),
    leaveTypeId: new FormControl(0),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    status: new FormControl('New'),
    reason: new FormControl(''),
    requestDate: new FormControl(new Date()),
  })

  if(this.masterSrv.loggedUserData.role =='Employee'){
    this.leavForm.controls['employeeId'].disable();
  }
 }

 getLeaveType(){
    this.masterSrv.getLeaveType().subscribe((res: APIResponse)=> {
      this.leaveType.set(res.data)
    })
  }


  saveLeave(){
    const leaveData = this.leavForm.getRawValue()
    debugger;
    this.masterSrv.createNewLeave(leaveData).subscribe((res: APIResponse)=>{
      if(res.result){
        alert('Leave has been created')
        this.getGridData()
      }
      else{
        alert(res.message)
      }
    })
  }


  changeLeave(id: number){
    this.masterSrv.changeLeaveRequests(id, 'Approved').subscribe((res: APIResponse)=>{
      this.leaveType.set(res.data)
      this.getGridData()
    })
  }
}
