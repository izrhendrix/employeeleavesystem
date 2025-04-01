import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


    loginObj:  any =  {
      "userName" : "",
      "password" : ""
    }

    //router allows you to navigate between view or components
    constructor(private http: HttpClient, private router: Router) {}

    onLogin() {
          this.http.post('https://projectapi.gerasim.in/api/EmployeeManagement/login', this.loginObj).subscribe((res:any)=>{
            if(res.result){
              localStorage.setItem("leaveUser", JSON.stringify(res.data))
              //navigate to dashboard after sucess response received
              this.router.navigateByUrl("dashboard")
            }else{
              alert( res.message)
            }
          })
      }


}
