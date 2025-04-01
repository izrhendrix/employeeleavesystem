import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { Component } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { NewLeaveComponent } from './pages/new-leave/new-leave.component';
import { EarnedLeaveComponent } from './pages/earned-leave/earned-leave.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'employee',
                component: EmployeeComponent
            },
            {
                path: 'leave-request',
                component: NewLeaveComponent
            },
            {
                path: 'Earned-leave',
                component: EarnedLeaveComponent
            }
        
        ]
    }


];
