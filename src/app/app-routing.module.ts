import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form-component/employee-form-component.component';
// import { AddemployeeComponent } from './addemployee/addemployee.component';

const routes: Routes = [
  {path:'addEmployee', component:EmployeeFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
