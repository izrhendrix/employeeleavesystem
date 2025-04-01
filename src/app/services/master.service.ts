import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, Dashboard, EarnedLeave, employee, LeaveRequest } from '../modal/master';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = "https://projectapi.gerasim.in/api/EmployeeManagement/"
  loggedUserData: any;

  constructor(private http : HttpClient) { 
    const localData = localStorage.getItem("leaveUser")
    if(localData) {
      this.loggedUserData = JSON.parse(localData);
    }
  }

  //specifying what kind of data you want to get
  getDepartment() : Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetParentDepartment")
  }


    //specifying what kind of data you want to get
  GetChildDepartmentByParentId(id: string) : Observable<APIResponse>{
      return this.http.get<APIResponse>(this.apiUrl + "GetChildDepartmentByParentId?deptId="+ id)
  }

      //specifying what kind of data you want to get
  GetAllChildDepartment() : Observable<APIResponse>{
        return this.http.get<APIResponse>(this.apiUrl + "GetAllChildDepartment")
  }
  
  
    
  createNewemployee(obj : employee) : Observable<employee>{
    return this.http.post<employee>(`${this.apiUrl}CreateEmployee`, obj)

  }

  getAllemployees() : Observable<employee[]>{
    return this.http.get<employee[]>(`${this.apiUrl}GetAllEmployees`)
  }


  DeleteEmployee(id: number): Observable<employee[]>{
    return this.http.delete<employee[]>(`${this.apiUrl}DeleteEmployee/` + id)
  }

  updateEmployee(obj: employee): Observable<employee[]>{
    return this.http.put<employee[]>(`${this.apiUrl}UpdateEmployee/` + obj.employeeId, obj)
  }

  AddEarnedLeave(obj: EarnedLeave): Observable<APIResponse>{
    return this.http.post<APIResponse>(`${this.apiUrl}AddNewEarnedLeave/`, obj)
  }

  GetAllEarnedLeaves(): Observable<APIResponse>{
    return this.http.get<APIResponse>(`${this.apiUrl}GetAllEarnedLeaves/`)
  }

  getLeaveType() : Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.apiUrl}getLeaveTypes`)
  }

  createNewLeave(obj: LeaveRequest):Observable<APIResponse> {
    return this.http.post<APIResponse>(`${this.apiUrl}CreateNewLeaveRequest/`, obj)
  }

  getLeaveRequestById(id: number): Observable<APIResponse>{
    return this.http.get<APIResponse>(`${this.apiUrl}GetAllLeaveRequestByEmpId?Id=`+ id)
  }

  getAllLeaveRequests(): Observable<APIResponse>{
    return this.http.get<APIResponse>(`${this.apiUrl}GetAllLeaveRequest`)
  }

  changeLeaveRequests(leaveId: number, status : string): Observable<APIResponse>{
    return this.http.get<APIResponse>(`${this.apiUrl}ChangeLeaveStatus?leaveId=`+leaveId+'&status='+ status)
  }

  getEmpployeeLeaveDashboard(id:number): Observable<Dashboard>{
    return this.http.get<Dashboard>(`${this.apiUrl}GetEmpployeeLeaveDashboard?id=`+ id)
  }

  GetHRDashboard(): Observable<Dashboard>{
    return this.http.get<Dashboard>(`${this.apiUrl}GetHRDashboard`)
  }
}
