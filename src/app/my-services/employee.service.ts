import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, of, tap } from 'rxjs';
import { Employee } from '../my-modals/employee';
import { DepartmentService } from './department.service';
import { JobTitleService } from './job-title.service';
import { OfficeService } from './office.service';
import { HttpClient } from '@angular/common/http';
import { FilterObject } from '../my-modals/filter-object';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7152/api/Employee';

  departmenetService?: DepartmentService;
  jobTitleService?: JobTitleService;
  officeService?: OfficeService;

  constructor(departmentService: DepartmentService, officeService: OfficeService, jobTitleService: JobTitleService, private http: HttpClient) {
    this.departmenetService = departmentService;
    this.jobTitleService = jobTitleService;
    this.officeService = officeService;
  }


  filtersUpdated: Subject<FilterObject> = new Subject<FilterObject>();
  employeesUpdated: Subject<void> = new Subject<void>();
  departmentCountUpdated: Subject<void> = new Subject<void>();
  officeCountUpdated: Subject<void> = new Subject<void>();
  jobTitleCountUpdated: Subject<void> = new Subject<void>();

  firstLetter?: string = '';
  searchTerm?: string = '';
  searchCriteria?: string = '';
  filterByDepart?: string = '';
  filterByOff?: string = '';
  filterByJob?: string = '';
  employees: Employee[] = [];


  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl)
  }


  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee).pipe(
      tap((newEmployee: Employee) => {
        this.employees.push(newEmployee);
        this.employeesUpdated.next();
        this.departmenetService?.getDepartments().subscribe(() => {
          this.departmentCountUpdated.next();
        });
        this.jobTitleService?.getJobTitles().subscribe(() => {
          this.departmentCountUpdated.next();
        });
        this.officeService?.getOffices().subscribe(() => {
          this.departmentCountUpdated.next();
        });

      })
    );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const url = `${this.apiUrl}/${employee.id}`;
    return this.http.put<Employee>(url, employee).pipe(
      tap(() => {
        this.employeesUpdated.next();
      })
    )
  }

  getEmployeeById(employeeId: string): Observable<any> {
    let url = `${this.apiUrl}/${employeeId}`;
    return this.http.get(url);
  }

  getEmployeeList(): Employee[] {
    return this.employees;
  }

  getEmployeeByEmpId(employeeId: string) {
    let employee = this.employees.find((e: Employee) => e.id == employeeId);
    if (employee) {
      return employee;
    }
    return null;
  }
  // filtersUpdated(){
  //   this.employeesSubject.next();
  // }

  searchAndFilter(filterObject: FilterObject) {
    this.filtersUpdated.next(filterObject);
  }
}
