import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employee = new BehaviorSubject<any>(null);
  currentEmployee = this.employee.asObservable();

  constructor() { }

  setEmployee(employee: any) {
    this.employee.next(employee);
  }
}
