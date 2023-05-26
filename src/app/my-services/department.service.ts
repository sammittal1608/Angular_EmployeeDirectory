import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Department } from '../my-modals/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }

  departmentId !: number;
  getDepartment(): Observable<Department[]> {
    let departments = localStorage.getItem('departments');
    if (departments) {
      let data = JSON.parse(departments);
      return of(data);
    } else {
      let departmentsList = [
        new Department({ id: 1, name: 'IT', count: 0 }),
        new Department({ id: 2, name: 'Human Resources', count: 0 }),
        new Department({ id: 3, name: 'MD', count: 0 }),
        new Department({ id: 4, name: 'Sales', count: 0 })
      ]
      localStorage.setItem('departments', JSON.stringify(departmentsList))
      return of(departmentsList);
    }
  }

  getDepartmentById(departmentId: any): any {
    let departments = localStorage.getItem('departments');
    if (departments) {
      let data = JSON.parse(departments);
      let department = data.find((d: Department) => Number(d.id) == departmentId);
      return department;
    }
    return null;
  }
  getDepartmentIdByName(departmentName: string): any {
    let departments = localStorage.getItem('departments');
    if (departments) {
      let data: Department[] = JSON.parse(departments);
      let department = data.find((d: Department) => d.name.toLowerCase() === departmentName.toLowerCase());
      return department ? Number(department.id) : null;
    }
    return null;
  }
  // updateSidebar(departmentName:string): void{
  //   let departments = localStorage.getItem('departments');
  //   if (departments) {
  //     let data = JSON.parse(departments);

  //       switch(departmentName){
  //     case 'IT':
  //     data[departmentName].count++;
  //     case 'Human Resou'
  //   }

  updateDepartmentCount(departmentName: Department): void {
    let departments: Department[] = JSON.parse(localStorage.getItem('departments') || '[]');
    let departmentIndex: number = departments.findIndex((d: Department) => d.id === departmentName.id);

    if (departmentIndex !== -1) {
      departments[departmentIndex].count++;
      localStorage.setItem('departments', JSON.stringify(departments));
    }
  }
  updateEditDepartmentCount(departmentName: Department): void {
    let departments: Department[] = JSON.parse(localStorage.getItem('departments') || '[]');
    let departmentIndex: number = departments.findIndex((d: Department) => d.id === departmentName.id);

    if (departmentIndex !== -1) {
      departments[departmentIndex].count--;
      localStorage.setItem('departments', JSON.stringify(departments));
    }
  }
}