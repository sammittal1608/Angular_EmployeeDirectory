import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Department } from '../my-modals/department';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'https://localhost:7152/api/department';

  constructor(private http: HttpClient) { }

  departmentId !: number;
  departments: Department[] = []
  private departmentCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  departmentCountUpdated: Observable<number> = this.departmentCountSubject.asObservable();

  getDepartmentById(departmentId: any): Observable<Department> {
    const url = `${this.apiUrl}/${departmentId}`;

    return this.http.get<Department>(url);
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl)
      .pipe(
        map((departments: Department[]) => {
          this.departments = departments;
          return departments;
        })
      );
  }

  getDepartmentList(): Department[] {
    return this.departments;
  }

  getDepartmentByDeptId(departmentId: string) {
    let department = this.departments.find((d: Department) => d.id == departmentId);
    if (department) {
      return department;
    }
    return null;
  }
  updateDepartmentCount(count: number) {
    this.departmentCountSubject.next(count);
  }

  getDepartmentIdByName(DepartmentName: string): string {
    let department = this.departments.find((d: Department) => d.name == DepartmentName);
    if (department) {
      return department.id;
    } return '';
  }
}