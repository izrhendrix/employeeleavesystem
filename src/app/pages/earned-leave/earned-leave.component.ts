import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { APIResponse, EarnedLeave, employee } from '../../modal/master';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-earned-leave',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, DatePipe],
  templateUrl: './earned-leave.component.html',
  styleUrl: './earned-leave.component.css'
})
export class EarnedLeaveComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  masterSrv = inject(MasterService)
  employee$: Observable<employee[]> = new Observable<employee[]>
  earnedLeave: EarnedLeave[] = []


  constructor(){
    this.initializeform()
    this.employee$ = this.masterSrv.getAllemployees()
  }


  ngOnInit(): void {
    this.getLeaves()
  }

  initializeform(){
    //this is how reactive forms are built
    this.form = new FormGroup({
      earnedLeaveId: new FormControl(0),
      employeeId: new FormControl(),
      totalEarnedLeave: new FormControl(0),
      lastUpdatedDate: new FormControl(new Date()),

    })
  }

  onSave(){
    const formValue = this.form.value;
    this.masterSrv.AddEarnedLeave(formValue).subscribe((res: APIResponse) => {
      if(res.result){
        alert("Leaves Added or modified")
        this.getLeaves()
      }else{
        alert(res.message)
      }
    })
  }

  getLeaves(){
    this.masterSrv.GetAllEarnedLeaves().subscribe((res: APIResponse) => {
      if(res.result){
        this.earnedLeave = res.data;
      }else{
        alert(res.message)
      }
    })
  }
}
