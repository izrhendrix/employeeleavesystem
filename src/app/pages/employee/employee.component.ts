import { Component, inject, OnInit } from '@angular/core';
import { APIResponse, childDept, employee, parentDept } from '../../modal/master';
import { FormsModule, NgModel } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  employeObj: employee = new employee();
  parentDeptId: string = '';
  masterSrv = inject(MasterService)
  parentDepartmentList: parentDept [] = []
  childDepartMentList: childDept[] =[];
  employeeList: employee[] = [];

  ngOnInit(): void {
    this.loadParentDept();
    //trigger api on page load
    this.showEmployeeList()
  }


  loadParentDept(){
    this.masterSrv.getDepartment().subscribe((res:APIResponse) =>{
      if(res.result){
        this.parentDepartmentList = res.data
      }else{
        console.log(res.result)
      }  
    })
  }

  getAllchild(){
    this.masterSrv.GetAllChildDepartment().subscribe((res:APIResponse) =>{
      if(res.result){
        this.childDepartMentList = res.data
      }else{
        console.log(res.result)
      }  
    })
  }

  onDeptChange(){
    this.masterSrv.GetChildDepartmentByParentId(this.parentDeptId).subscribe((res: APIResponse)=>{
      this.childDepartMentList = res.data
    })
  }

  onSaveEmployee(){
    this.masterSrv.createNewemployee(this.employeObj).subscribe((res: employee) => {
      if(res.employeeId){
        alert("Employee has been created")
        this.showEmployeeList();
      }else{
        alert("Unable to create, please make sure details have been filled correctly")
      }
    })
  }

  showEmployeeList(){
    this.masterSrv.getAllemployees().subscribe((res: employee[])=>{
      this.employeeList = res
    })
  }

  onDelete(id: number){
    // works like the alert box
    const isDelete = confirm ("Are you sure")
    if(isDelete){
      this.masterSrv.DeleteEmployee(id).subscribe((res: employee[])=> {
        this.showEmployeeList()
      })
    }
  }

  onUpdate(emp: employee){
    // works like the alert box
      this.masterSrv.updateEmployee(emp).subscribe((res: employee[])=> {
        alert('employee has been updated')
        this.employeObj = new employee()
      })
  }

  editEmployee(item: employee){
    this.employeObj = item
    this.getAllchild()
  }
}
